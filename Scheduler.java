package kr.co.kstar.api.config;

import kr.co.kstar.api.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Scheduler{
    private final List<String> locales=Arrays.asList("ko", "en", "zh", "jp");
    private final Map<String, List> productMap=Collections.synchronizedMap(new HashMap());
    private final Map<String, List> ordMap=Collections.synchronizedMap(new HashMap());

    private final ProductMapper productMapper;

    @Autowired
    public Scheduler(ProductMapper productMapper){
        this.productMapper=productMapper;
    }

    @Scheduled(fixedDelay=60000)
    public void collect(){
        Map productMap=new HashMap(), ordMap=new HashMap();
        for(String locale : locales){
            List<Map> productList;
            if("ko".equals(locale)){
                productList=productMapper.selectKorProductList();

                for(Map map : productList){
                    String productCd=(String)map.get("productCd");
                    ordMap.put(productCd, productMapper.selectProductOrd(productCd));
                }
            }else{
                productList=productMapper.selectProductList(locale);
            }
            productMap.put(locale, productList);
        }

        this.productMap.clear();
        this.productMap.putAll(productMap);

        this.ordMap.clear();
        this.ordMap.putAll(ordMap);
    }

    public List getProducts(String locale){
        return productMap.get(locale==null || locale.trim().length()==0 || "ko".equals(locale) ? "ko" : locale);
    }

    public List getProductOrd(String productCd){
        return ordMap.get(productCd);
    }
}
