package kr.co.kstar.api;

public class UserEntity{
    private String email;
    private String name;
    private String tel;
    private String zipcode;
    private String addr;
    private String addrDetail;
    private Integer retentionAmount;

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getTel(){
        return tel;
    }

    public void setTel(String tel){
        this.tel=tel;
    }

    public String getZipcode(){
        return zipcode;
    }

    public void setZipcode(String zipcode){
        this.zipcode=zipcode;
    }

    public String getAddr(){
        return addr;
    }

    public void setAddr(String addr){
        this.addr=addr;
    }

    public String getAddrDetail(){
        return addrDetail;
    }

    public void setAddrDetail(String addrDetail){
        this.addrDetail=addrDetail;
    }

    public Integer getRetentionAmount(){
        return retentionAmount;
    }

    public void setRetentionAmount(Integer retentionAmount){
        this.retentionAmount=retentionAmount;
    }
}
