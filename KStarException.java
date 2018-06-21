package kr.co.kstar.api;

public class KStarException extends RuntimeException{
    private final String code;

    public String getCode(){
        return code;
    }

    public KStarException(String code){
        super();

        this.code=code;
    }

    public KStarException(String code, Throwable cause){
        super(cause);

        this.code=code;
    }
}
