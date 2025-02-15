package com.app.Service;

import java.util.List;

import com.app.Entity.Area;

public interface AreaService {

	Area createArea(Area area);

	Area updateArea(Long areaId, Area area);

	void deleteArea(Long areaId);

	List<Area> getAllAreas();

	Area getAreaById(Long areaId);

}
