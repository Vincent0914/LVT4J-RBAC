package com.lvt4j.rbac.data.bean;

import com.lvt4j.basic.TDB.Table;

import lombok.Data;

@Data
@Table("user_access")
public class UserAccess{

    public String proId;
    public String userId;
    public String accessPattern;
    
}