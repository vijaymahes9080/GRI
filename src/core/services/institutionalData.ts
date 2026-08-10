/**
 * GRI Institutional Data Store & Resource Directory
 * 100% Comprehensive Mapping from GRI_DEEP_COMPONENT_AUDIT.md
 */

export interface SchoolCategory {
  id: string;
  name: string;
  departments: { code: string; name: string; head: string; email: string }[];
}

export interface FacilityItem {
  id: string;
  name: string;
  category: 'ACADEMIC' | 'RESEARCH' | 'INFRASTRUCTURE';
  description: string;
  link: string;
}

export interface CellItem {
  code: string;
  name: string;
  coordinator: string;
  url: string;
}

export interface OperationalManual {
  title: string;
  category: string;
  pdfUrl: string;
}

export const GRI_BASE_URL = 'https://ruraluniv.ac.in';

export const GRI_INSTITUTIONAL_DATA = {
  institution: 'The Gandhigram Rural Institute (Deemed to be University)',
  motto: 'கிராமம் உயர நாடு உயரும் (As villages rise, the nation rises)',
  accreditation: 'Accredited by NAAC with A++ Grade (4th Cycle, 3.61 CGPA)',
  ministry: 'Ministry of Education (Shiksha Mantralaya), Govt. of India',
  location: 'Gandhigram, Dindigul District, Tamil Nadu - 624302',

  schools: [
    {
      id: 'agri',
      name: 'School of Agriculture & Rural Development',
      departments: [
        { code: 'AGR', name: 'Department of Agriculture', head: 'Dr. M. Sundaram', email: 'agri@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'lang',
      name: 'School of Tamil, Indian Languages & Fine Arts',
      departments: [
        { code: 'TAM', name: 'Department of Tamil', head: 'Dr. P. Murugesan', email: 'tamil@ruraluniv.ac.in' },
        { code: 'MAL', name: 'Centre for Malayalam Studies', head: 'Dr. K. Sreedharan', email: 'malayalam@ruraluniv.ac.in' },
        { code: 'HIN', name: 'Department of Hindi', head: 'Dr. S. Sharma', email: 'hindi@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'sci',
      name: 'School of Sciences',
      departments: [
        { code: 'MAT', name: 'Department of Mathematics', head: 'Dr. P. Balasubramaniam', email: 'maths@ruraluniv.ac.in' },
        { code: 'PHY', name: 'Department of Physics', head: 'Dr. K. Marimuthu', email: 'physics@ruraluniv.ac.in' },
        { code: 'CHE', name: 'Department of Chemistry', head: 'Dr. S. Abraham John', email: 'chemistry@ruraluniv.ac.in' },
        { code: 'BIO', name: 'Department of Biology', head: 'Dr. R. Ramasubbu', email: 'biology@ruraluniv.ac.in' },
        { code: 'CS', name: 'Department of Computer Science & Applications', head: 'Dr. R. Ramanathan', email: 'cs@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'health',
      name: 'School of Health Sciences & Rural Sanitation',
      departments: [
        { code: 'HSC', name: 'Department of Applied Research & Health Sciences', head: 'Dr. S. Meenakshi', email: 'health@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'mgt',
      name: 'School of Management Studies',
      departments: [
        { code: 'RM', name: 'Department of Rural Management', head: 'Dr. N. Kannan', email: 'management@ruraluniv.ac.in' },
        { code: 'COP', name: 'Department of Cooperation', head: 'Dr. L. Rathakrishnan', email: 'cooperation@ruraluniv.ac.in' },
        { code: 'COM', name: 'Department of Commerce', head: 'Dr. M. Senthil', email: 'commerce@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'soc',
      name: 'School of Social Sciences',
      departments: [
        { code: 'GTP', name: 'Department of Gandhian Thought & Peace Science', head: 'Dr. D. Nevin', email: 'gandhian@ruraluniv.ac.in' },
        { code: 'POL', name: 'Department of Political Science & Development Administration', head: 'Dr. G. Kurian', email: 'polscience@ruraluniv.ac.in' },
        { code: 'SOC', name: 'Department of Sociology', head: 'Dr. S. Raja', email: 'sociology@ruraluniv.ac.in' },
        { code: 'LLE', name: 'Department of Lifelong Learning & Extension', head: 'Dr. K. Ganesan', email: 'extension@ruraluniv.ac.in' },
        { code: 'HOM', name: 'Department of Home Science', head: 'Dr. S. Rajkumari', email: 'homescience@ruraluniv.ac.in' },
      ],
    },
    {
      id: 'eng',
      name: 'School of Engineering & Technology',
      departments: [
        { code: 'CRE', name: 'Department of Civil & Rural Engineering', head: 'Dr. K. Ganesan', email: 'civil@ruraluniv.ac.in' },
        { code: 'FAD', name: 'B.Voc Footwear & Accessories Design', head: 'Dr. P. Vijay', email: 'bvoc@ruraluniv.ac.in' },
      ],
    },
  ],

  facilities: [
    { id: 'lib', name: 'Central Library', category: 'ACADEMIC', description: 'Central Library with OPAC, e-Journals, and Dr. G.R. Collection', link: `${GRI_BASE_URL}/facilities?content=library` },
    { id: 'cc', name: 'Computer Centre', category: 'ACADEMIC', description: 'High-performance computing & campus Wi-Fi infrastructure', link: `${GRI_BASE_URL}/gri?CC=about` },
    { id: 'nano', name: 'Nanoscience & Nanotechnology Centre', category: 'RESEARCH', description: 'Advanced cleanroom & synthesis facility', link: `${GRI_BASE_URL}/facilities?content=About_NANO_Facility` },
    { id: 'nmr', name: 'NMR Instrument Facility', category: 'RESEARCH', description: 'Nuclear Magnetic Resonance Spectrometer facility in Chemistry', link: `${GRI_BASE_URL}/facilities?content=About_NMR_Facility` },
    { id: 'xrd', name: 'XRD Facility', category: 'RESEARCH', description: 'X-Ray Diffraction structural analysis facility', link: `${GRI_BASE_URL}/facilities?content=About_XRD_Facility` },
    { id: 'seaweed', name: 'UBA GRI Seaweed Startup Facility', category: 'RESEARCH', description: 'Seaweed processing & bio-product incubator', link: `${GRI_BASE_URL}/facilities?content=SEAWEED_1` },
    { id: 'avc', name: 'Audio Visual Centre', category: 'ACADEMIC', description: 'E-content development & broadcast studio', link: `${GRI_BASE_URL}/facilities?content=Audio_Visual_Centre` },
    { id: 'lcs', name: 'Lecture Capturing System', category: 'ACADEMIC', description: 'Automated classroom recording & LMS streaming', link: `${GRI_BASE_URL}/facilities?content=Lecture_Capturing_System` },
  ],

  cells: [
    { code: 'IQAC', name: 'Internal Quality Assurance Cell', coordinator: 'Dr. P. Shanmugam', url: `${GRI_BASE_URL}/academics?content=iqac` },
    { code: 'IPRC', name: 'Intellectual Property Rights Cell', coordinator: 'Dr. M. Ganesan', url: `${GRI_BASE_URL}/academics?content=ipr_cell` },
    { code: 'UBA', name: 'Unnat Bharat Abhiyan (Regional Institute)', coordinator: 'Dr. T. Kalaiselvan', url: `${GRI_BASE_URL}/cell?content=UBA_RegIns` },
    { code: 'KVK', name: 'Krishi Vigyan Kendra', coordinator: 'Dr. V. Sundaram', url: 'https://www.icarkvkdindigul.org/' },
    { code: 'DDU-KK', name: 'Deen Dayal Upadhyaya Kaushal Kendra', coordinator: 'Dr. K. Ganesan', url: `${GRI_BASE_URL}/includes/kk/home` },
    { code: 'MMTTC', name: 'Malaviya Mission Teacher Training Centre', coordinator: 'Dr. S. Meenakshi', url: `${GRI_BASE_URL}/academics?content=AboutMMTTC` },
    { code: 'PLACEMENT', name: 'Centre for Training and Placement', coordinator: 'Dr. R. Ramanathan', url: `${GRI_BASE_URL}/gri?CC=PlacementBureau` },
    { code: 'CED', name: 'Centre for Entrepreneurship Development', coordinator: 'Dr. N. Kannan', url: `${GRI_BASE_URL}/cell?content=ced` },
  ],

  manuals: [
    { title: 'Finance and Accounts Manual', category: 'FINANCE', pdfUrl: `${GRI_BASE_URL}/includes/cetc/circular/pdf/Finance_Accounts_Manual170317.pdf` },
    { title: 'Guest House Operational Manual', category: 'HOSTEL', pdfUrl: `${GRI_BASE_URL}/includes/infrastructure/guesthouse/pdf/FGH_operational_Manual.pdf` },
    { title: 'Hostel Manual', category: 'HOSTEL', pdfUrl: `${GRI_BASE_URL}/includes/infrastructure/hostel/HOSTEL_MANUAL.pdf` },
    { title: 'Working Women Hostel Manual', category: 'HOSTEL', pdfUrl: `${GRI_BASE_URL}/includes/infrastructure/hostel/ww_hostel.pdf` },
    { title: 'Campus Security Manual', category: 'SECURITY', pdfUrl: `${GRI_BASE_URL}/includes/manual/CampusSecurity.pdf` },
    { title: 'Sanitation Works Manual', category: 'SANITATION', pdfUrl: `${GRI_BASE_URL}/includes/manual/sanitation.pdf` },
    { title: 'Examination System Manual', category: 'EXAMINATION', pdfUrl: `${GRI_BASE_URL}/includes/examination/pdf/ExaminationSystem.pdf` },
  ],
};
