package com.app.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.Area;
import com.app.Repository.AreaRepository;

@Service
@Transactional
public class AreaServiceImpl implements AreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Override
    public Area createArea(Area area) {
        return areaRepository.save(area);
    }

    @Override
    public Area updateArea(Long areaId, Area area) {
        Optional<Area> existingArea = areaRepository.findById(areaId);
        if (existingArea.isPresent()) {
            area.setAreaId(areaId);
            return areaRepository.save(area);
        } else {
            throw new RuntimeException("Area with ID " + areaId + " not found.");
        }
    }

    @Override
    public void deleteArea(Long areaId) {
        Optional<Area> area = areaRepository.findById(areaId);
        if (area.isPresent()) {
            areaRepository.delete(area.get());
        } else {
            throw new RuntimeException("Area with ID " + areaId + " not found.");
        }
    }

    @Override
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    @Override
    public Area getAreaById(Long areaId) {
        return areaRepository.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Area with ID " + areaId + " not found."));
    }
}
