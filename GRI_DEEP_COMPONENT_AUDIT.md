# Complete GRI Official Website Deep Component Audit

**Source Website**: [https://ruraluniv.ac.in/](https://ruraluniv.ac.in/) & [GRI Portals Hub](https://www.ruraluniv.ac.in/Portal/index.html)  
**Audited By**: Browser Subagent & Full-Stack AI Engineer  
**Coverage**: 100% of All Page Elements, Header Utilities, Navigation Dropdowns, Sub-Portals, Announcement Tickers, Footer Columns, Statutory Rules, and PDF Manual Links.

---

## 1. 🌐 Top Bar & Utility Header Components

| Utility Component | Target URL | Function / Description |
|---|---|---|
| **Study in India Portal** | `https://www.studyinindia.gov.in/admission/registrations` | International student admissions portal link |
| **Samarth@GRI ERP** | `https://ruraluniv.samarth.ac.in/index.php/site/login` | Samarth e-Gov Suite portal login |
| **Accessibility Settings** | `https://ruraluniv.ac.in/personwd` | PWD accessibility options |
| **Text Size Adjuster** | In-page JavaScript (`zoomIn()`, `zoomOut()`, `resetZoom()`) | Dynamic font scale adjustment |
| **Color Contrast Switcher** | In-page CSS (`#518214` Forest Green / `#F16236` Saffron) | High-contrast visual theme toggles |
| **GRI Webmail** | `https://webmail.ruraluniv.ac.in/` | Institutional faculty & staff email client |
| **Quick Contact & Home** | `home.php`, `contacts.php` | Quick links to home and university contacts |

---

## 2. 🏛️ Navigation Bar Taxonomy & Sub-Menu Components

### A. About GRI (`aboutgri`)
- **Vision & Mission**: `aboutgri?content=vm`
- **Profile & Genesis**: `aboutgri?content=profile` & `aboutgri?content=GenesisofGRI`
- **Best Practices & Institutional Distinctiveness**: `aboutgri?content=best_practices`
- **Life in GRI**: `BestPractices?content=BestPractices`
- **Former Chancellors & VCs**: `aboutgri?content=FormerChancellors` & `aboutgri?content=FormerViceChancellors`
- **Campus & Location**: `aboutgri?content=campus`, `aboutgri?content=grilogo`, `http://ruraluniv.ac.in/includes/aboutgri/map/map.html`, `gridu?content=location`

### B. Governance System (`Governance`)
- **Governance Overview**: `Governance?content=System`
- **Executive Council (EC / BoM)**: `Governance?content=EC_CompositionFunctions`
- **Planning and Monitoring Board**: `Governance?content=PlanningAndMonitoring_Constitution`
- **Finance Committee**: `Governance?content=FinanceCommittee_Composition`
- **Academic Council**: `Governance?content=AcademicCouncil_Composition`

### C. Administration (`administration`)
- **Chancellor, Vice-Chancellor, Registrar, Controller of Examinations, Finance Officer, Chief Vigilance Officer**.
- **Deans & Heads of Departments Directory**: `administration?content=deans`, `administration?content=hod`, `administration?content=officers`

### D. Academics & Schools (`academics`)
- **CBCS System**: `academics?content=CBCSsystem`
- **Programmes Offered**: `academics?content=programmes`
- **7 Major Schools**:
  1. School of Agriculture & Rural Development
  2. School of Tamil, Indian Languages & Fine Arts
  3. School of Sciences
  4. School of Health Sciences & Rural Sanitation
  5. School of Management Studies
  6. School of Social Sciences
  7. School of Engineering & Technology
- **Special Academic & Research Centres**:
  - Centre for Women's Studies: `academics?content=womensstudies`
  - Centre for Geoinformatics: `academics?content=geoinformatics`
  - Centre for Social Exclusion and Inclusive Policy (CSEIP): `academics?content=cseip`
  - Rural Energy Centre: `http://ruraluniv.ac.in/includes/academics/programmes/brochure/15330.pdf`
  - Research and Development Cell (RDC): `academics?content=Home`
  - Student's Handbook: `academics?content=calendar`

### E. Admissions (`admissions`)
- **Prospectus 2026-27**: `https://www.ruraluniv.ac.in/includes/admissions/2026/pdf/Prospectus_202627.pdf`
- **Prospectus 2025-26**: `https://www.ruraluniv.ac.in/includes/admissions/2025/pdf/Prospectus_202526.pdf`
- **Regulations**: M.Phil. Regulations (`admissions?content=MPhil_Regulations`), Ph.D. Regulations (`admissions?content=PhD_Regulations`), D.Sc. and D.Litt. Regulations (`admissions?content=Dsc_Regulations`)
- **Fee Policies**: Hostel fees details (`admn1?content=Hostel_fee`) & Fee Refund Policy (`admn1?content=Refund`)

### F. Examination (`examination`)
- **Examination System & CBCS**: `examination?content=ExaminationSystem`, `2008.pdf`, `2015.pdf`
- **ESE Time Table Tool**: `http://ruraluniv.ac.in/examtt`
- **Applications**: Application for Transcript (`Application_Transcript.pdf`), Duplicate Certificates (`DuplicateCertificate.pdf`)
- **Ph.D. Tracking & e-SANAD**: `https://www.ruraluniv.ac.in/GRIIMS1/` & `https://www.portal.ruraluniv.ac.in/esanad`

---

## 3. 🎯 GRI Portals Hub Components (`/Portal/index.html`)

1. **Student Portal (GRI - SP)**: `https://portal.ruraluniv.ac.in/` (Profile, Semester fees, CFA Marks, Payment History, Results, Grievances)
2. **Research Scholar Portal (GRI - RSP)**: `https://portal.ruraluniv.ac.in/scholar` (Course work exam fees, supplementary fees)
3. **Hostel Portal (GRI - HP)**: `https://ruraluniv.ac.in/grihostel/login` (Hostel admission, Mess & Hostel fees)
4. **Learning Management System (GRI - LMS)**: `https://portal.ruraluniv.ac.in/lms`
5. **Staff Attendance Portal (GRI - AP)**: `https://attendance.ruraluniv.ac.in/` (Hourly attendance marking)
6. **Pensioner Portal (GRI - PP)**: `https://pension.ruraluniv.ac.in/` (Pension profile, Life certificate)
7. **G TracK (GRI - GT)**: `https://portal.ruraluniv.ac.in/etrack` (File tracking system)
8. **Department Portal (GRI - Department)**: `https://portal.ruraluniv.ac.in/Department` (Transfer-cum Migration Certificate)
9. **Ph.D. Evaluation Portal**: `https://ruraluniv.ac.in/phd_evaluation/` (External examiner login)

---

## 4. 📢 Announcements & Ticker Components (Tabbed UI)

- **CIRCULAR**: UMIS status updates (`250626ed06.pdf`), Ph.D. Viva-Voce schedules (CS, Mathematics, Biology, Tamil, English), Austerity measures notice (`110626ed02.pdf`), Ombudsperson appointment notice (`241225ed03.pdf`).
- **EVENTS**: Generic Electives (Gandhian Thought), Multidisciplinary Courses (Biology, Home Science, Tamil, French), National Post-metric Scholarship (`23062026_1.pdf`), Research Fellowships (`18052026_06.pdf`), SC/ST Ambedkar Overseas Scholarship (`130526ed01.pdf`).
- **TENDERS**: Quotations for Answer Booklets (`Quotation06082026.pdf`), Desktop Computers (`Quotationdesktop05082026.pdf`), Statement of Grades.
- **CAREERS**: Walk-in Interviews for Matron & Research Assistants (`Matron05082026.pdf`).

---

## 5. 📜 Complete Footer Section Breakdown (6 Columns)

- **Col 1 (Statutory Rules)**: Regulations 2023 (`UGCRegulations2023.pdf`), UGC 2010 rules (`UGCRegulations2010.pdf`), CCS Rules (`CCS_CCA_Rules.pdf`), Code of Conduct (Teaching/Staff/Students), Staff Seniority Roster (`Roster31122024`), Ban on Student Vehicles (`BanStudentsVehicles.pdf`), Access to PWD.
- **Col 2 (Links & Portals)**: Dr. G.R. Books Gallery, eJournals, National Scholarship Portal, Anti-Ragging Undertaking, e-PG Pathshala, CEC, National Academic Depository (NAD), National Career Service, IRINS Research (`ruraluniv.irins.org`), Student Grievance Ombudsperson (`committee?content=Ombudsperson`).
- **Col 3 (RTI & Schemes)**: Officers for RTI (`rtiofficers`), PIO (`PIO.pdf`), DDU-KK (`includes/kk/home`), Unnat Bharat Abhiyan (`cell?content=UBA_RegIns`), e-Samadhan (`samadhaan.ugc.ac.in`), MMTTC (`academics?content=AboutMMTTC`), Viksit Bharat (`ViksitBharat`).
- **Col 4 (Cells & Committees)**: IQAC, GBFSTC, IPRC, GIAN, HEPSN, NSS, KVK (`icarkvkdindigul.org`), Reservation Cell, YRC, NAD Cell, Minority Cell, OBC Cell, Anti Ragging, Equal Opportunity Cell, Placement Bureau, Entrepreneurship Development Cell.
- **Col 5 (Mandatory Disclosures)**: Mandatory Disclosures 2026 (`GRIMandatoryDisclosure26.pdf`), Sustainable Practices (`SDGs.pdf`), 12B Status (`12b_status.pdf`), NCTE (`MD202324.pdf`), AICTE (`AICTEMandate2025.pdf`), ODL Application (`odl.pdf`), Strategic Plans (`6_2_1_B_Strategic_Plans.pdf`), Annual Account Statements (`AnnualAccountStaments`), Internal Complaints Committee (`icc_members`).
- **Col 6 (Manuals)**: Finance Manual (`Finance_Accounts_Manual170317.pdf`), VPP (`vpp2032015.pdf`), Guest House (`FGH_operational_Manual.pdf`), Hostel (`HOSTEL_MANUAL.pdf`), Working Women Hostel (`ww_hostel.pdf`), Campus Security (`CampusSecurity.pdf`), Sanitation Works (`sanitation.pdf`), Examination Manual (`ExaminationSystem.pdf`).
