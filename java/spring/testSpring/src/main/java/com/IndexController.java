package com;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by toshiba on 15/4/20.
 */
@Controller
public class IndexController {

    @RequestMapping(value="/index",method = RequestMethod.GET)
    public String index(){
        return "index";
    }

    @RequestMapping(value="/index1",method = RequestMethod.GET)
    @ResponseBody
    public String index1(){
        return "indexsfsfds";
    }
}
