package com.akshayapatravms.c4g;

import com.akshayapatravms.c4g.AkshayaPatraVmsApp;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = AkshayaPatraVmsApp.class)
public @interface IntegrationTest {
}
