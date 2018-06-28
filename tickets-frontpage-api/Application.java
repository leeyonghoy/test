package kr.co.kstar.api;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.kstar.api.exception.KStarException;
import kr.co.kstar.api.property.KStarApiProperty;

@SpringBootApplication
@EnableScheduling
public class Application extends SpringBootServletInitializer{
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder springApplicationBuilder){
        return springApplicationBuilder.sources(Application.class);
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder){
        return restTemplateBuilder.build();
    }

    @Bean
    public ObjectMapper objectMapper(){
        return  new ObjectMapper(){{
            configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);
        }};
    }

    @Bean
    public LettuceConnectionFactory connectionFactory(){
        return new LettuceConnectionFactory();
    }

    @Bean
    public TaskScheduler taskScheduler(){
        return new ConcurrentTaskScheduler();
    }

    private final Map<String, UserEntity> userMap=Collections.synchronizedMap(new HashMap());
    @Bean
    public WebMvcConfigurer securityResolveArgumentConfig(RestTemplate restTemplate, KStarApiProperty kstarApiProperty){
        return new WebMvcConfigurer(){
            @Override
            public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers){
                argumentResolvers.add(new HandlerMethodArgumentResolver(){
                    @Override
                    public boolean supportsParameter(MethodParameter parameter){
                        return parameter.getParameterType().equals(UserEntity.class);
                    }

                    @Override @Nullable
                    public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer, NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory){
                        if(parameter.getParameterType().equals(UserEntity.class)){
                            String authorization=webRequest.getHeader("Authorization");
                            if(userMap.get(authorization)==null){
                                HttpEntity httpEntity=new HttpEntity(new HttpHeaders(){{
                                    setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                                    setContentType(MediaType.APPLICATION_JSON);
                                    set("Authorization", authorization);
                                }});
                                userMap.put(authorization, restTemplate.exchange(kstarApiProperty.getUser("/api/member"), HttpMethod.GET, httpEntity, Data.class).getBody().data.setAuthorization(authorization));
                            }
                            return userMap.get(authorization).setIp(webRequest);
                        }
                        throw new KStarException("401", HttpStatus.UNAUTHORIZED);
                    }
                });
            }
        };
    }
    private static class Data{
        public UserEntity data;
    }

    @Configuration
    public static class WebMvcConfig implements WebMvcConfigurer{
        @Override
        public void addCorsMappings(CorsRegistry registry){
            registry.addMapping("/**")
                    .allowedMethods("GET", "POST", "PUT");
        }
    }

    @ControllerAdvice
    public class ExceptionHandlingController{
        @ExceptionHandler(KStarException.class)
        public ResponseEntity handleBindingErrors(KStarException e){
            e.printStackTrace();

            return new ResponseEntity(new HashMap(){{
                put("code", e.getCode());
            }}, e.getStatus());
        }

        @ExceptionHandler(Throwable.class)
        public ResponseEntity handleBindingErrors(Throwable t){
            t.printStackTrace();

            return new ResponseEntity(new HashMap(){{
                put("code", "0");
                put("message", t.getMessage());
            }}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
