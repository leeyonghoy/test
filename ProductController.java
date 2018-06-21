package kr.co.kstar.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.kstar.api.UserEntity;
import kr.co.kstar.api.config.Scheduler;
import kr.co.kstar.api.service.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController{
    private final Scheduler scheduler;
    private final ProductService productService;

    public ProductController(Scheduler scheduler, ProductService productService){
        this.scheduler=scheduler;
        this.productService=productService;
    }

    @GetMapping("/products")
    public List products(UserEntity userEntity, String locale){
        return scheduler.getProducts(locale);
    }

    @GetMapping("/product/{productCd}/ord")
    public List product(@PathVariable(value="productCd") String productCd){
        return scheduler.getProductOrd(productCd);
    }
}
