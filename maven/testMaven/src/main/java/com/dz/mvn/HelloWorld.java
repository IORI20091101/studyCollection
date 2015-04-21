package main.java.com.dz.mvn;

public class HelloWorld {
	public String sayHello() {
		return "Hello World";
	}
	
	public static void main(String[] args) {
		HelloWorld res = new HelloWorld();
		
		System.out.println(res.sayHello());
		
	}
}
