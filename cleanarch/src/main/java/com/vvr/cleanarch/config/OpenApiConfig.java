package com.vvr.cleanarch.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("To-Do List API")
                        .description("API REST para gerenciamento de tarefas (To-Do List) construída com Spring Boot seguindo os princípios da Clean Architecture")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Vinicius V. Rodrigues")
                                .url("https://github.com/ViniciusVRodrigues")));
    }
}
