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
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class Application extends SpringBootServletInitializer{
    final RestTemplate restTemplate;

    public Application(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate=restTemplateBuilder.build();
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder springApplicationBuilder){
        return springApplicationBuilder.sources(Application.class);
    }

    @Bean
    public LettuceConnectionFactory connectionFactory(){
        return new LettuceConnectionFactory();
    }

    @Bean
    public HttpSessionStrategy httpSessionStrategy(){
        return new HeaderHttpSessionStrategy();
    }

    @Bean
    public static ConfigureRedisAction configureRedisAction(){
        return ConfigureRedisAction.NO_OP;
    }

    @Bean
    public TaskScheduler taskScheduler(){
        return new ConcurrentTaskScheduler();
    }

    @Bean
    public WebMvcConfigurer securityResolveArgumentConfig(){
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
                            HttpEntity httpEntity=new HttpEntity(new HttpHeaders(){{
                                setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                                setContentType(MediaType.APPLICATION_JSON);
                                set("Authorization", webRequest.getHeader("Authorization"));
                            }});
                            String a=restTemplate.exchange("https://dev.kstar.tv/api/member", HttpMethod.GET, httpEntity, String.class);

                            return restTemplate.exchange("https://dev.kstar.tv/api/member", HttpMethod.GET, new HttpEntity(new HttpHeaders(){{
                                setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                                setContentType(MediaType.APPLICATION_JSON);
                                set("Authorization", webRequest.getHeader("Authorization"));
                            }}), UserEntity.class);
                        }
                        throw new KStarException("401");
                    }
                });
            }
        };
    }

    @Configuration
    public static class WebMvcConfig implements WebMvcConfigurer{
        @Override
        public void addCorsMappings(CorsRegistry registry){
            registry.addMapping("/**");
        }
    }

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
