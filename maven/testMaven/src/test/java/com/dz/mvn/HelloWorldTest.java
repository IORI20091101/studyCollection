package test.java.com.dz.mvn;
import main.java.com.dz.mvn.HelloWorld;

import org.junit.*;  
import static junit.framework.Assert.*;  
public class HelloWorldTest {
	 @Test  
     public void testSayHello(){       
          HelloWorld h = new HelloWorld();  
          assertEquals(h.sayHello(),"Hello World");  
     }  
}
