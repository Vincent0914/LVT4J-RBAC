package com.lvt4j.rbac.data.bean;

import lombok.Data;

import com.lvt4j.basic.TDB.Col;
import com.lvt4j.basic.TDB.Table;

@Data
@Table("user_role")
public class UserRole{
    @Col(id=true, idSeq=0)
    public String proId;
    
    @Col(id=true, idSeq=1)
    public String userId;
    
    @Col(id=true, idSeq=2)
    public String roleId;
}
