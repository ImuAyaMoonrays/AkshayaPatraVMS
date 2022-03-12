package com.akshayapatravms.c4g.service.dto;

import org.springframework.core.io.InputStreamResource;

public class CsvDTO {

    private String fileName;

    private InputStreamResource dataStream;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public InputStreamResource getDataStream() {
        return dataStream;
    }

    public void setDataStream(InputStreamResource dataStream) {
        this.dataStream = dataStream;
    }


}
