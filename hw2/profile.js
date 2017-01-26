    var item="";
    function updateinfor(){
        //set the regular expression for zipcode
        var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$");
        //set the regular expression for phone number
        var phoneReg = new RegExp("^[1-9][0-9]{2}[-][0-9]{3}[-][0-9]{4}$");
        //set the regular expression for email
        var emailReg= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$");
        
        var name=document.getElementById('disp_name');
        var email=document.getElementById('email');
        var phone=document.getElementById('phone');
        var zipcode=document.getElementById('zipcode');
        var password=document.getElementById('password');
        var pass_conf=document.getElementById('pass_conf');
        var name_show=document.getElementById('name_show');
        var email_show=document.getElementById('email_show');
        var phone_show=document.getElementById('phone_show');
        var zip_show=document.getElementById('zip_show');
        var alertinfo=document.getElementById('alertinfo');
        var infotable=document.getElementById('infotable');

        if(name.value!="")
            item=item+"display name ,";
        //validate the email
        if(!validate(email,emailReg,"email ,")){
             //window.alert("Your email does not match the requested format a@b.co, please enter a valid email address.");
             infotable.style.display="";
             alertinfo.innerHTML="Your email does not match the requested format a@b.co, please enter a valid email address.";
             item="";
                return false;
        }
        //use regular expression to validate the phone number
        if(!validate(phone,phoneReg,"phone ,")){
            //window.alert("Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number.");
            infotable.style.display="";
            alertinfo.innerHTML="Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number.";
            item="";
            return false;  
        }
        //use regular expression to validate the zipcode
        if(!validate(zipcode,zipReg,"zipcode ,")){
            
            infotable.style.display="";
            alertinfo.innerHTML="Your zipcode does not match the requested format 99999 or 99999-9999. Please enter a valid zipcode.";
            
            item="";
            return false;
            
        }
        //password confirmation required
        if(pass_conf.value!=password.value){
            infotable.style.display="";
            alertinfo.innerHTML="Your password confirmation is not as same as your password!";

            item="";
            return false;
        }
        if(password.value!=""){   
            item=item+"password ,";
            
        }
        if(item!=""){
            infotable.style.display="";
            alertinfo.innerHTML="You have updated information as following successfully!\nUpdated information: "+item.substring(0,item.length-1);
            item="";
        }
        //change the displayed information
        changeinfor(name, name_show);
        changeinfor(email, email_show);
        changeinfor(phone, phone_show);
        changeinfor(zipcode, zip_show);
        password.value="";
        pass_conf.value="";

        
    }
    //change the displayed information
    function changeinfor(newinfo, showinfo){
        if(newinfo.value!=""){

            showinfo.innerHTML=newinfo.value;
            newinfo.value="";
            
        }
        
    }
    //validate information
    function validate(infor,inforReg,alertinfo){
        if(infor.value!="")
            if(!(inforReg.test(infor.value)))
                return false;
            else item=item+alertinfo;
        
        return true;
    }