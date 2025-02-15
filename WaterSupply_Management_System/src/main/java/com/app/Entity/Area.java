package com.app.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "areas")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long areaId;

    @Column(nullable = false, unique = true)
    private String areaName;

   
    @Column(nullable = false)
    private int dailyWaterQuota;

//    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<User> workers;

	public Long getAreaId() {
		return areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public int getDailyWaterQuota() {
		return dailyWaterQuota;
	}

	public void setDailyWaterQuota(int dailyWaterQuota) {
		this.dailyWaterQuota = dailyWaterQuota;
	}

	
	

	

   
    
}
