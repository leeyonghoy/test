package kr.co.kstar.api.exception;

import org.springframework.http.HttpStatus;

public class KStarException extends RuntimeException{
    private final String code;
    private final HttpStatus status;

    public String getCode(){
        return code;
    }

    public HttpStatus getStatus(){
        return status;
    }

    public KStarException(String code){
        super();

        this.code=code;
        this.status=HttpStatus.BAD_REQUEST;
    }

    public KStarException(Throwable cause){
        super(cause);

        this.code="500";
        this.status=HttpStatus.BAD_REQUEST;
    }

    public KStarException(String code, Throwable cause){
        super(cause);

        this.code=code;
        this.status=HttpStatus.BAD_REQUEST;
    }

    public KStarException(String code, HttpStatus status){
        super();

        this.code=code;
        this.status=status;
    }

    public KStarException(String code, HttpStatus status, Throwable cause){
        super(cause);

        this.code=code;
        this.status=status;
    }
}
