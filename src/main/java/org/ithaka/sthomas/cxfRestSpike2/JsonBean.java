package org.ithaka.sthomas.cxfRestSpike2;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

@SuppressWarnings("restriction")
@XmlRootElement
public class JsonBean {
    private String val1;
    private String val2;

    @XmlElement
    public String getVal1() {
	return val1;
    }

    public void setVal1(String val1) {
	this.val1 = val1;
    }

    @XmlElement
    public String getVal2() {
	return val2;
    }

    public void setVal2(String val2) {
	this.val2 = val2;
    }

}
