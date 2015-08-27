package com.company;

import net.sf.json.JSONObject;
import org.apache.commons.io.input.TailerListenerAdapter;
import redis.clients.jedis.Jedis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by toshiba on 15/8/26.
 */
public class MyTailerListener extends TailerListenerAdapter {
    private ArrayList<ProvinceBean> ipDataList = new ArrayList<ProvinceBean>();
    private int totalCount = 0;

    public MyTailerListener () {
        ipDataList.add(new ProvinceBean(0, 1, "甘肃"));
        ipDataList.add(new ProvinceBean(0, 2, "青海"));
        ipDataList.add(new ProvinceBean(0, 3, "广西"));
        ipDataList.add(new ProvinceBean(0, 4, "贵州"));
        ipDataList.add(new ProvinceBean(0, 5, "重庆"));
        ipDataList.add(new ProvinceBean(0, 6, "北京"));
        ipDataList.add(new ProvinceBean(0, 7, "福建"));
        ipDataList.add(new ProvinceBean(0, 8, "安徽"));
        ipDataList.add(new ProvinceBean(0, 9, "广东"));
        ipDataList.add(new ProvinceBean(0, 10, "西藏"));
        ipDataList.add(new ProvinceBean(0, 11, "新疆"));
        ipDataList.add(new ProvinceBean(0, 12, "海南"));
        ipDataList.add(new ProvinceBean(0, 13, "宁夏"));
        ipDataList.add(new ProvinceBean(0, 14, "陕西"));
        ipDataList.add(new ProvinceBean(0, 15, "山西"));
        ipDataList.add(new ProvinceBean(0, 16, "湖北"));
        ipDataList.add(new ProvinceBean(0, 17, "湖南"));
        ipDataList.add(new ProvinceBean(0, 18, "四川"));
        ipDataList.add(new ProvinceBean(0, 19, "云南"));
        ipDataList.add(new ProvinceBean(0, 20, "河北"));
        ipDataList.add(new ProvinceBean(0, 21, "河南"));
        ipDataList.add(new ProvinceBean(0, 22, "辽宁"));
        ipDataList.add(new ProvinceBean(0, 23, "山东"));
        ipDataList.add(new ProvinceBean(0, 24, "天津"));
        ipDataList.add(new ProvinceBean(0, 25, "江西"));
        ipDataList.add(new ProvinceBean(0, 26, "江苏"));
        ipDataList.add(new ProvinceBean(0, 27, "上海"));
        ipDataList.add(new ProvinceBean(0, 28, "浙江"));
        ipDataList.add(new ProvinceBean(0, 29, "吉林"));
        ipDataList.add(new ProvinceBean(0, 30, "内蒙古"));
        ipDataList.add(new ProvinceBean(0, 31, "黑龙江"));
        ipDataList.add(new ProvinceBean(0, 32, "香港"));
        ipDataList.add(new ProvinceBean(0, 33, "澳门"));
        ipDataList.add(new ProvinceBean(0, 34, "台湾"));
    }

    /**
     * 将json格式的字符串解析成Map对象 <li>
     * json格式：{"name":"admin","retries":"3fff","testname"
     * :"ddd","testretries":"fffffffff"}
     */
    public static HashMap<String, String> toHashMap(Object object)
    {
        HashMap<String, String> data = new HashMap<String, String>();
        // 将json字符串转换成jsonObject
        JSONObject jsonObject = JSONObject.fromObject(object);
        //System.out.println(jsonObject);
        Iterator it = jsonObject.keys();
        // 遍历jsonObject数据，添加到Map对象
        while (it.hasNext())
        {
            String key = String.valueOf(it.next());
            String value = jsonObject.getString(key);
            data.put(key, value);
        }
        return data;
    }

    public void handle(String line) {
        //System.out.println(line);
        HashMap<String, String> dataOri = dealLine(line);

//        for( int i = 0; i < data.length; i++ ) {
//            System.out.println(i + " : "+data[i]);
//        }
        if( dataOri.get("ip") == null || dataOri.get("dateStr") == null || dataOri.get("web") == null ) {
            System.out.println("err ip data arr is empyt!!!");
        } else {
            String ipData = HttpRequest.sendGet("http://int.dpool.sina.com.cn/iplookup/iplookup.php", "format=json&ip=" + dataOri.get("ip"));
            //System.out.println("ip" + ipData);
            System.out.println("检测ipdata数据类型：");
            System.out.println(ipData.getClass().getName());
            HashMap<String, String> hm = MyTailerListener.toHashMap(ipData);

            dataOri.put("province", hm.get("province"));
            System.out.println(dataOri);
            if( dataOri.get("province") != null ) {

                RedisClient redisClient = new RedisClient();
                Jedis jedis = redisClient.getJedis();

                Iterator itr = ipDataList.iterator();
                while( itr.hasNext() ) {
                    ProvinceBean pb = (ProvinceBean)itr.next();
                    if( pb.getName().equals(dataOri.get("province")) ) {
                        pb.setCount( (pb.getCount())+ 1 );

                        jedis.hset("ezheLogTotal", "province_" + pb.getId(), pb.getCount()+ "-" + dataOri.get("dateStr") + "-" + dataOri.get("web") );

                        jedis.set("ezheLog_" + dataOri.get("dateStr"), pb.getId() + "-" + dataOri.get("web"));
                        jedis.expire("ezheLog_" + dataOri.get("dateStr"), 60);
                    }
                }

                totalCount++;

                jedis.hset("ezheLogTotal", "totalCount", "" + totalCount);

                jedis.publish("ezhelog", "hello");


            }
        }

    }

    public HashMap<String, String> dealLine(String line) {
        HashMap<String, String> dataMap = new HashMap<String, String>();
        String[] list = line.split(" ");
        if( list[0] != null ) {
            dataMap.put("ip", list[0]);
        }

        if( list[3] != null ) {
            dataMap.put("dateStr", list[3].substring(1));
        }

        if( list[5] != null ) {
            dataMap.put("web", list[5].substring(1, (list[5].length() - 1) ));
        }



        return dataMap;
    }
}
