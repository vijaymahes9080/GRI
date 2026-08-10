# Complete GRI Official Website Deep Component Audit & Resource Directory

**Source Website**: [https://ruraluniv.ac.in/](https://ruraluniv.ac.in/) & [GRI Portals Hub](https://www.ruraluniv.ac.in/Portal/index.html)  
**Audited By**: Browser Subagent & Full-Stack AI Engineer  
**Coverage**: 100% Comprehensive Component-by-Component Mapping (All Header Tools, Dropdown Menus, Sub-Portals, 30+ Departments, 15+ Facilities, 16+ Cells, Statutory Disclosures, Manuals, and Exact PDF URLs).

---

## 1. 🌐 Top Bar & Utility Header Components

| Utility Component | Target URL / JavaScript Trigger | Detailed Function / Description |
|---|---|---|
| **Study in India Portal** | `https://www.studyinindia.gov.in/admission/registrations` | Direct registration portal for international and NRI students. |
| **Samarth@GRI ERP** | `https://ruraluniv.samarth.ac.in/index.php/site/login` | Samarth e-Gov Suite central portal for staff & institutional operations. |
| **Accessibility Settings** | `https://ruraluniv.ac.in/personwd` | Dedicated accessibility options for Persons with Disabilities (PWD). |
| **Zoom-In Tool** | `javascript:zoomIn()` | Increases page viewport zoom level by +0.1 increments. |
| **Zoom-Out Tool** | `javascript:zoomOut()` | Decreases page viewport zoom level by -0.1 increments (clamped at 0.5). |
| **Reset Zoom Tool** | `javascript:resetZoom()` | Resets viewport zoom level to 1.0 (default). |
| **Forest Green Theme** | `javascript:ChangeGreenColor()` | Toggles theme primary color to `#518214` (Forest Green). |
| **Saffron Theme** | `javascript:ChangeOrangeColor()` | Toggles theme accent color to `#F16236` (Saffron Orange). |
| **Header Search Engine** | `form action="search.php" method="get"` | Institutional keyword search input field. |
| **Home Button** | `home.php` | Main homepage landing redirect. |
| **Contact Button** | `contacts.php` | Phone numbers, email directory, and postal address. |
| **GRI Webmail** | `https://webmail.ruraluniv.ac.in/` | Webmail portal for `@ruraluniv.ac.in` email accounts. |
| **Portal Redirect Button** | `https://www.ruraluniv.ac.in/Portal/index.html` | Central hub for all 9 university sub-portals. |

---

## 2. 🏛️ Navigation Bar Taxonomy & Sub-Menu Components

### Category A: About GRI (`aboutgri`)
- **Vision & Mission**: `aboutgri?content=vm` — Rural transformation, Gandhian ideals, Nai Talim philosophy.
- **Profile**: `aboutgri?content=profile` — Historical evolution and institutional mandate.
- **Genesis of GRI**: `aboutgri?content=GenesisofGRI` — Established in 1956 by Dr. T.S. Soundaram & Dr. G. Ramachandran.
- **Best Practices & Institutional Distinctiveness**: `aboutgri?content=best_practices` — Rural extension, village adoption, green campus practices.
- **Life in GRI**: `BestPractices?content=BestPractices` — Campus environment and student cultural activities.
- **Former Leadership**: Former Chancellors (`aboutgri?content=FormerChancellors`) & Former Vice-Chancellors (`aboutgri?content=FormerViceChancellors`).
- **Campus & Emblem**: Campus profile (`aboutgri?content=campus`), official logo significance (`aboutgri?content=grilogo`), interactive campus map (`includes/aboutgri/map/map.html`), location guide (`gridu?content=location`).

### Category B: Governance & Statutory Bodies (`Governance`)
- **Governance System**: `Governance?content=System`
- **Executive Council (EC / BoM)**: `Governance?content=EC_CompositionFunctions` — Highest executive authority composition and powers.
- **Planning and Monitoring Board**: `Governance?content=PlanningAndMonitoring_Constitution` — Institutional development and academic expansion planning.
- **Finance Committee**: `Governance?content=FinanceCommittee_Composition` — Annual budget, financial audits, and accounts.
- **Academic Council**: `Governance?content=AcademicCouncil_Composition` — Academic policies, CBCS regulations, and degree approvals.

### Category C: Administration (`administration`)
- **Chancellor**: `administration?content=chancellor`
- **Vice-Chancellor**: `administration?content=vc`
- **Registrar**: `administration?content=registrar`
- **Controller of Examinations (CoE)**: `administration?content=coe`
- **Finance Officer**: `administration?content=financeofficer`
- **Chief Vigilance Officer**: `administration?content=VigilanceOfficer`
- **Deans of Schools**: `administration?content=deans` — Deans directory across 7 major schools.
- **Heads of Departments (HODs)**: `administration?content=hod` — HOD directory across 30+ departments.
- **Officers in Administration**: `administration?content=officers` — Administrative officers and section heads.

### Category D: Academics, Schools & Departments (`academics`)
- **CBCS System**: `academics?content=CBCSsystem` — Choice Based Credit System regulations (40% CIA + 60% ESE).
- **Programmes Offered**: `academics?content=programmes` — UG, PG, Diploma, Certificate, Ph.D. programmes.
- **7 Major Schools & 30+ Departments**:
  1. **School of Agriculture & Rural Development**: Department of Agriculture.
  2. **School of Tamil, Indian Languages & Fine Arts**: Department of Tamil, Centre for Malayalam Studies, Department of Hindi.
  3. **School of Sciences**: Department of Mathematics, Department of Physics, Department of Chemistry, Department of Biology, Department of Computer Science & Applications.
  4. **School of Health Sciences & Rural Sanitation**: Department of Applied Research, Health & Sanitation.
  5. **School of Management Studies**: Department of Rural Management, Department of Cooperation, Department of Commerce.
  6. **School of Social Sciences**: Department of Gandhian Thought & Peace Science, Department of Political Science & Development Administration, Department of Sociology, Department of Lifelong Learning & Extension, Centre for Futures Studies, Department of Home Science.
  7. **School of Engineering & Technology**: Department of Civil & Rural Engineering, B.Voc Footwear & Accessories Design.
- **Special Academic & Research Centres**:
  - Centre for Women's Studies: `academics?content=womensstudies`
  - Centre for Geoinformatics: `academics?content=geoinformatics`
  - Centre for Social Exclusion and Inclusive Policy (CSEIP): `academics?content=cseip`
  - Rural Energy Centre: `http://ruraluniv.ac.in/includes/academics/programmes/brochure/15330.pdf`
  - KVK Extension Centre: `http://ruraluniv.ac.in/includes/academics/pdf/KVK.pdf`
  - Research and Development Cell (RDC): `academics?content=Home`
  - Student's Handbook: `academics?content=calendar`

### Category E: Admissions (`admissions`)
- **Prospectus 2026-27**: `https://www.ruraluniv.ac.in/includes/admissions/2026/pdf/Prospectus_202627.pdf`
- **Prospectus 2025-26**: `https://www.ruraluniv.ac.in/includes/admissions/2025/pdf/Prospectus_202526.pdf`
- **M.Phil. Regulations**: `admissions?content=MPhil_Regulations`
- **Ph.D. Regulations (July 2026 Batch)**: `admissions?content=PhD_Regulations` & `https://www.ruraluniv.ac.in/phd/instructions.html`
- **D.Sc. and D.Litt. Regulations**: `admissions?content=Dsc_Regulations` & Application (`admn1?content=Dsc_app`)
- **Fee Policies**: Hostel fees details (`admn1?content=Hostel_fee`) & Fee Refund Policy (`admn1?content=Refund`)
- **ITEP Programme 2026-2027**: Integrated Teacher Education Programme (`aboutgri?content=itep2026`)

### Category F: Examination & Evaluation (`examination`)
- **Examination System**: `examination?content=ExaminationSystem`, CBCS 2008 (`2008.pdf`), CBCS 2015 (`2015.pdf`)
- **ESE Time Table Tool**: `http://ruraluniv.ac.in/examtt` (Select Course / Programme timetable query tool)
- **Transcript & Duplicate Certificates**: Transcript Application (`Application_Transcript.pdf`), Duplicate Certificate Application (`DuplicateCertificate.pdf`)
- **Ph.D. Tracking**: `https://www.ruraluniv.ac.in/GRIIMS1/`
- **e-SANAD**: Verification Notification (`e-sanad301221.pdf`) & Registration Form (`https://www.portal.ruraluniv.ac.in/esanad`)

### Category G: Facilities & Infrastructure (`facilities` & `infrastructure`)
- **Academic Facilities**:
  - Library: `facilities?content=library`
  - Computer Centre: `gri?CC=about`
  - Internet Browsing Centre: `facilities?content=ibc`
  - Centre for E-content Development: `facilities?content=cedt`
  - Physical Education and Yoga Centre: `facilities?content=phyedu`
  - Centre for Nanoscience and Nanotechnology: `facilities?content=About_NANO_Facility`
  - NMR Instrument Facility (Dept. of Chemistry): `facilities?content=About_NMR_Facility`
  - XRD Facility: `facilities?content=About_XRD_Facility`
  - UBA GRI Seaweed Startup Facility: `facilities?content=SEAWEED_1`
  - Museum of Constructive Programme: `facilities?content=museum`
  - Audio Visual Centre: `facilities?content=Audio_Visual_Centre`
  - Lecture Capturing System: `facilities?content=Lecture_Capturing_System`
  - Central Instrumentation Centre: `facilities?content=Central_Instrumentation_Centre`
  - Animal House: `facilities?content=Animal_House`
  - Business Lab: `facilities?content=Business_Lab`
  - Art Gallery: `facilities?content=Art_Gallery`
  - Theatre: `facilities?content=Theatre`
- **Campus Infrastructure**:
  - Hostels: `infrastructure?content=AboutHostel`
  - Guest House: `infrastructure?content=guesthouse`
  - Health Centre: `infrastructure?content=AboutHealthCentre`
  - Canteen: `infrastructure?content=canteen`
  - Bank: `infrastructure?content=bank`
  - Day Care Centre: `infrastructure?content=aboutus`
  - Working Women's Hostel: `infrastructure?content=workingwomenshostel`
  - Examination Hall: `infrastructure?content=ExamHall`

---

## 3. 🎯 GRI Portals Hub Components (`/Portal/index.html`)

1. **Student Portal (GRI - SP)** (`https://portal.ruraluniv.ac.in/`): Profile, Semester fees, Supplementary fees, CFA Marks, Payment History, Results, Grievances, Downloads, SC/ST Grievances, Feedback Form.
2. **Research Scholar Portal (GRI - RSP)** (`https://portal.ruraluniv.ac.in/scholar`): Scholar profile, Course work exam fees, supplementary fees.
3. **Hostel Portal (GRI - HP)** (`https://ruraluniv.ac.in/grihostel/login`): Hostel admission, Mess fees, Hostel fee payment.
4. **Learning Management System (GRI - LMS)** (`https://portal.ruraluniv.ac.in/lms`): E-learning materials, assignment submissions, course slides.
5. **Staff Attendance Portal (GRI - AP)** (`https://attendance.ruraluniv.ac.in/`): Hourly attendance marking system exclusively for faculty & staff.
6. **Pensioner Portal (GRI - PP)** (`https://pension.ruraluniv.ac.in/`): GRI Pensioner profile, pension status, Life Certificate uploads, downloads.
7. **G TracK (GRI - GT)** (`https://portal.ruraluniv.ac.in/etrack`): Institutional file tracking and movement system.
8. **Department Portal (GRI - Department)** (`https://portal.ruraluniv.ac.in/Department`): Transfer-cum-Migration Certificate processing.
9. **Ph.D. Evaluation Portal** (`https://ruraluniv.ac.in/phd_evaluation/`): External thesis examiner login and report submission.

---

## 4. 📜 Complete 6-Column Footer Section PDF & Link Directory

### Column 1: STATUTORY RULES / DISCLOSURES / POLICIES
- **Deemed to be University Regulations - 2023**: `includes/footer/pdf/UGCRegulations2023.pdf`
- **UGC Regulations (Minimum Eligibility for Appointments) 2010**: `includes/footer/pdf/UGCRegulations2010.pdf`
- **CCS Rules**: `includes/footer/pdf/CCS_CCA_Rules.pdf`
- **Code of Conduct of Teaching Staff**: `includes/footer/pdf/code_ofConduct_Of_TeachingStaff.pdf`
- **Code of Conduct of Non-Teaching Staff**: `includes/footer/pdf/code_ofConduct_Of_NonTeachingStaff.pdf`
- **Code of Conduct of Students**: `includes/footer/pdf/code_ofConduct_Of_Students.pdf`
- **Downloads**: `gridu?content=downloads`
- **Gandhigram Literary Review**: `gridu?content=LiteraryReview_Vol1`
- **Journal of Extension & Research**: `gridu?content=Callfor`
- **Working Hours**: `gridu?content=workinghours`
- **Staff List & Seniority Roster**: `gridu?content=StaffSeniorityRoster` & `gridu?content=Roster31122024`
- **Ban on the Use of Vehicles by Students**: `includes/footer/pdf/BanStudentsVehicles.pdf`
- **Access to PWD**: `personwd.php`

### Column 2: LINKS / PORTALS
- **Dr. G.R. Books Gallery**: `https://www.ruralunivlibrary.ac.in/dr_g_r_collection.html`
- **eJournals**: `https://ess.inflibnet.ac.in/eres.php?memID=112`
- **National E-Scholarship Portal**: `https://scholarships.gov.in/`
- **Anti Ragging Undertaking**: `http://www.antiragging.in/affidavit_registration_disclaimer.html`
- **UGC Videos Regarding Ragging**: `https://www.antiragging.in/video.html`
- **e-PG Pathshala**: `http://epgp.inflibnet.ac.in/`
- **E-content CEC**: `https://cec.nic.in/cec/`
- **National Academic Depository (NAD)**: `https://nad.gov.in/`
- **National Career Service**: `https://www.ncs.gov.in/Pages/default.aspx`
- **Caste Based Discrimination Prevention Committee**: `committee?content=cbdc_committee`
- **IRINS Service**: `http://ruraluniv.irins.org/`
- **Student Grievance Redressal Ombudsperson**: `committee?content=Ombudsperson`
- **Students Activity**: `https://www.ruraluniv.ac.in/intranet_mail/GRI-STUDENTS-ACTIVITIES-2019-2024.pdf`

### Column 3: RTI / SCHEMES
- **Officers for RTI**: `gridu?content=rtiofficers`
- **Public Information Officer**: `includes/footer/pdf/PIO.pdf`
- **Statutory Bodies**: `gridu?content=PlanningMonitoring`
- **MoA**: `gridu?content=moa`
- **Bye-Law**: `gridu?content=ByeLaw`
- **DDU-KK**: `https://www.ruraluniv.ac.in/includes/kk/home`
- **Unnat Bharat Abhiyan (UBA)**: `https://ruraluniv.ac.in/cell?content=UBA_RegIns`
- **e-Samadhan**: `https://samadhaan.ugc.ac.in`
- **MMTTC**: `academics?content=AboutMMTTC`
- **Viksit Bharat @2047**: `gridu?content=ViksitBharat`

### Column 4: CELLS / COMMITTEES
- **IQAC**: `academics?content=iqac`
- **GBFSTC**: `cell?content=GBFSabout`
- **IPRC**: `academics?content=ipr_cell`
- **GIAN**: `cell?content=AboutGIAN`
- **HEPSN**: `cell?content=AboutHepsn`
- **NSS**: `cell?content=AboutNSS`
- **KVK**: `https://www.icarkvkdindigul.org/`
- **Reservation Cell**: `cell?content=RcellAboutUs`
- **YRC Cell**: `cell?content=YRCcellAbout`
- **NAD Cell**: `cell?content=NADcellMembers`
- **Minority Cell**: `cell?content=MinorityCell`
- **OBC Cell**: `cell?content=OBCCell`
- **Anti Ragging**: `cell?content=AntiRagging_Monitoring`
- **Equal Opportunity Cell**: `cell?content=eoc`
- **Centre for Training and Placement**: `gri?CC=PlacementBureau`
- **Centre for Entrepreneurship Development**: `cell?content=ced`

### Column 5: MANDATORY DISCLOSURES
- **Mandatory Disclosures 2026**: `http://ruraluniv.ac.in/includes/footer/pdf/GRIMandatoryDisclosure26.pdf`
- **Sustainable Practices**: `http://ruraluniv.ac.in/includes/footer/pdf/SDGs.pdf`
- **12 B Status**: `http://ruraluniv.ac.in/includes/footer/pdf/12b_status.pdf`
- **NCTE Approval**: `includes/ManDisc/MD202324.pdf`
- **AICTE Approval**: `includes/ManDisc/AICTEMandate2025.pdf`
- **ODL Application**: `includes/ManDisc/odl.pdf`
- **Strategic Plans of GRI**: `includes/ManDisc/6_2_1_B_Strategic_Plans.pdf`
- **Annual Account Statements**: `gridu?content=AnnualAccountStaments`
- **Internal Complaints Committee**: `cell?content=icc_members`
- **Other Committees**: `committee?content=Committees`

### Column 6: MANUALS
- **Finance and Accounts Manual**: `includes/cetc/circular/pdf/Finance_Accounts_Manual170317.pdf`
- **VPP Manual**: `includes/cetc/circular/pdf/vpp2032015.pdf`
- **Guest House Operational Manual**: `includes/infrastructure/guesthouse/pdf/FGH_operational_Manual.pdf`
- **Hostel Manual**: `includes/infrastructure/hostel/HOSTEL_MANUAL.pdf`
- **Working Women Hostel**: `includes/infrastructure/hostel/ww_hostel.pdf`
- **Campus Security Manual**: `includes/manual/CampusSecurity.pdf`
- **Sanitation Works Manual**: `includes/manual/sanitation.pdf`
- **Examination Manual**: `includes/examination/pdf/ExaminationSystem.pdf`
