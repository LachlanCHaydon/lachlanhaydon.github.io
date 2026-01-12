---
permalink: /projects/tgf-analysis/
title: "TGF Lightning Analysis Pipeline"
layout: single
author_profile: true
toc: true
toc_label: "Contents"
toc_sticky: true
---

## Overview

Terrestrial gamma-ray flashes (TGFs) are intense bursts of high-energy radiation produced by thunderstorms. As part of the Telescope Array collaboration, I developed an automated pipeline to detect and analyze TGFs using data from multiple atmospheric sensors.

## The Challenge

**Problem:** Manual analysis of TGF events required:
- Processing TB-scale datasets from 5+ instrument types
- Synchronizing data with microsecond timing precision
- Manual spectroscopic calibration taking 2+ hours per event
- Inconsistent analysis methods across events

**Solution:** Built an automated, reproducible pipeline with:
- Parameterized scripts for multi-instrument data processing
- Interactive GUI for spectroscopic analysis
- Automated wavelength calibration and peak detection
- JSON-based project management system

## Technical Architecture

### Data Sources
1. **Interferometer (INTF)** - Lightning channel imaging with azimuth/elevation
2. **Fast Antenna (FA)** - Electric field measurements
3. **Surface Detectors (TASD)** - Gamma-ray detection array (507 detectors)
4. **Spectroscopy** - Wavelength-resolved lightning emissions
5. **Photometry** - Multi-channel optical measurements

### Pipeline Components

**Data Integration Layer:**
- Reverse-engineered legacy analysis code
- Resolved timing offset issues between instruments
- Implemented automated time synchronization algorithms

**Analysis Engine:**
- Spectroscopic wavelength calibration (656nm, 777nm anchor points)
- Peak detection and baseline removal
- Chemistry ratio calculations (337/777, 391/777)
- Temperature estimation from emission line ratios

**Visualization Tools:**
- Interactive tkinter GUI with 4-tab workflow
- Real-time parameter adjustment
- Export functionality for publication figures

## Key Results

### Performance Improvements
- **80% reduction** in analysis time (120 min → 15 min per event)
- **<2nm accuracy** in automated wavelength calibration
- **Microsecond precision** in multi-instrument synchronization

### Scientific Contributions
- Co-authored paper: "Observation of Downward TGF Associated with Dart Leaders" (*Atmospheres*, submitted)
- Analyzed 15-80 identifiable spectral peaks per lightning event
- Enabled systematic comparison across multiple TGF events

## Example Analysis

*Figures from analysis of August 17, 2024 event - to be added*

## Technical Highlights

### Challenge: Spectral Drift
**Problem:** Spectral peaks shift ±25nm between frames due to lightning channel movement

**Solution:** Keyframe-based calibration system
- User calibrates 3-5 representative frames
- Program interpolates calibration coefficients
- Maintains accuracy across entire sequence

### Challenge: Multi-Instrument Timing
**Problem:** Each instrument uses different time bases and trigger systems

**Solution:** Master reference time system
- Fast Antenna (FA) serves as time reference (T0)
- Automated offset calculation for each instrument
- Sub-microsecond synchronization achieved

## Technologies Used

**Core:** Python 3.9+, NumPy, Matplotlib, SciPy  
**GUI:** tkinter  
**Data:** JSON, CSV, HDF5  
**Analysis:** Spectroscopy calibration, peak detection, polynomial fitting  
**Visualization:** Publication-quality scientific plots

---

## Related Publications

**"Observation of a Downward Terrestrial Gamma-Ray Flash Associated with Dart Leaders of a Negative Cloud-to-Ground Lightning Flash"**  
N. Kieu, R. U. Abbasi, L. Haydon, et al.  
*Atmospheres* (submitted December 2024)

---

*This project demonstrates my ability to reverse-engineer complex systems, automate manual workflows, and build user-friendly tools for scientific analysis - skills directly applicable to data engineering, sensor fusion, and scientific computing roles.*
