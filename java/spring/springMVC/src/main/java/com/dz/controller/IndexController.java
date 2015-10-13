package com.dz.controller;

import com.dz.constant.IConstants;
import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by toshiba on 15/4/20.
 */
@Controller
public class IndexController {

    @RequestMapping(value="/index",method = RequestMethod.GET, headers=IConstants.NOT_AJAX_EL)
    public String index(){
        return "index";
    }

    @RequestMapping(value="/hello", method = RequestMethod.GET)
    public ModelAndView hello() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("hello");
        return mv;
    }

    @RequestMapping(value="/index1",method = RequestMethod.GET)
    @ResponseBody
    public String index1(){
        return "indexsfsfds this a ajax string";
    }
}
