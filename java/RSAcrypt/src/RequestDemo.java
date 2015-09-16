
import org.apache.commons.io.IOUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;

public class RequestDemo {

    private static final String privateKey = "MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBAJlP/edO+VRjLM4dIPEjFBWVShNlTvsr6FiLagAWFDH/TlrpbZ0wveDrYBjBc/UGSR3Sks8rK2dSIrH0eae/fhqU+55z8N/jQUnB+2CLQIAD84EDsYODx9tceTheKV3S6vGyAf7qJKIo/6Fu2RqqUlu9vvlCqsXUKLeRWs4MX051AgMBAAECgYEAk2FDas4Pf2ELXGTCGy0mjI0ENdsI7wnJhP0YfFa9OUb98wU9G4QUtJhwu7uUljJhrWqVONR+GAfsVHf5TxoVxUkN+3aJ2dR3J29EAVM0jgJnS2BaxYbwj+YLwUzVmcN56U624ONn5sLvAcuq4TQOqrtYF6G5mznPqURPRA5mlWECQQDI7juWWjTFZ/o3CJ0UPvgH8HpocjT8lb6jNqDkhVbonmWpjFH472KnfP18MqSrEV6KcemMnXfqkFkSJZHmqdsNAkEAw1TCGReUREO7dzf0A4tPF7DOq7QdUS4klHJmjJGOafovr19Q7cZ3VotpD94bJKZt6FsazAJ/+OLmc4DMBb5HCQJBAKS9lwN2IFA+KQuYN1nTKv8vbt1VzhXOHMiq0I2suY3t2MKDdu4YL5XNR/Pdfd94VUBDl04gCaK7CRx0y0QIvb0CQQCiXfk+PGBt4lOZhTRcIdfsHHefOQhJq+6SSwo9fN0B8QrkX3n5PMmEcjwyCXFMpN+ljt2WidlwvMPNbVmqyIFpAkEAp0zJG5xipKCdxBAsyq+jWaGseAAitXCmiQxcqSeqhjNSYOAschmdweGea5kESKjUYUc4wBB9PwkIUfJcwULM1g==";

    private static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZT/3nTvlUYyzOHSDxIxQVlUoTZU77K+hYi2oAFhQx/05a6W2dML3g62AYwXP1Bkkd0pLPKytnUiKx9Hmnv34alPuec/Df40FJwftgi0CAA/OBA7GDg8fbXHk4Xild0urxsgH+6iSiKP+hbtkaqlJbvb75QqrF1Ci3kVrODF9OdQIDAQAB";

    private static String dataSource = "这段数据用来加密并发送到dohko api!";

    public static void testPost() throws Exception {
        /**
         * 首先要和URL下的URLConnection对话。 URLConnection可以很容易的从URL得到。比如： // Using
         *  java.net.URL and //java.net.URLConnection
         *
         *  使用页面发送请求的正常流程：在页面http://www.faircanton.com/message/loginlytebox.asp中输入用户名和密码，然后按登录，
         *  跳转到页面http://www.faircanton.com/message/check.asp进行验证
         *  验证的的结果返回到另一个页面
         *
         *  使用java程序发送请求的流程：使用URLConnection向http://www.faircanton.com/message/check.asp发送请求
         *  并传递两个参数：用户名和密码
         *  然后用程序获取验证结果
         */
        URL url = new URL("http://localhost:8080/api/test");
        URLConnection connection = url.openConnection();
        /**
         * 然后把连接设为输出模式。URLConnection通常作为输入来使用，比如下载一个Web页。
         * 通过把URLConnection设为输出，你可以把数据向你个Web页传送。下面是如何做：
         */
        connection.setDoOutput(true);
        /**
         * 最后，为了得到OutputStream，简单起见，把它约束在Writer并且放入POST信息中，例如： ...
         */
        OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "utf8");

        byte[] dataSourceBytes = dataSource.getBytes();

        byte[] dataEncrypt = RSAUtils.encryptByPrivateKey(dataSourceBytes, privateKey);

        String sign = RSAUtils.sign(dataEncrypt, privateKey);

        try {
            out.write("data=" + java.net.URLEncoder.encode(dataSource,   "utf-8") + "&sign=" + java.net.URLEncoder.encode(sign,   "utf-8")); //向页面传递数据。post的关键所在！
            // remember to clean up
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        /**
         * 这样就可以发送一个看起来象这样的POST：
         * POST /jobsearch/jobsearch.cgi HTTP 1.0 ACCEPT:
         * text/plain Content-type: application/x-www-form-urlencoded
         * Content-length: 99 username=bob password=someword
         */
        // 一旦发送成功，用以下方法就可以得到服务器的回应：
        String sCurrentLine;
        String sTotalString;
        sCurrentLine = "";
        sTotalString = "";
        InputStream l_urlStream;
        l_urlStream = connection.getInputStream();
        // 传说中的三层包装阿！
        BufferedReader l_reader = new BufferedReader(new InputStreamReader(
                l_urlStream));
        while ((sCurrentLine = l_reader.readLine()) != null) {
            sTotalString += sCurrentLine + "/r/n";

        }
        System.out.println(sTotalString);
    }

    public static void main(String[] args) throws Exception {
        testPost();
    }
}