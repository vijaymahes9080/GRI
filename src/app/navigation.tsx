import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Building,
  GraduationCap,
  FileCheck,
  MapPin,
  Shield,
  FileText,
  Users,
  Award,
  Sun,
  Globe,
  Archive,
  Download,
} from 'lucide-react-native';

interface NavSubItem {
  name: string;
  url?: string;
  badge?: string;
}

interface NavSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: NavSubItem[];
}

export default function DedicatedNavigationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    about: true,
    academics: true,
    admissions: true,
    examination: true,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navTaxonomy: NavSection[] = [
    {
      id: 'about',
      title: 'About GRI',
      icon: Building,
      color: '#518214',
      items: [
        { name: 'Vision & Mission', url: 'https://ruraluniv.ac.in/aboutgri?content=vm' },
        { name: 'Profile & History', url: 'https://ruraluniv.ac.in/aboutgri?content=profile' },
        { name: 'Genesis of GRI (Founded 1956)', url: 'https://ruraluniv.ac.in/aboutgri?content=GenesisofGRI' },
        { name: 'Best Practices & Institutional Distinctiveness', url: 'https://ruraluniv.ac.in/aboutgri?content=best_practices' },
        { name: 'Life in GRI Campus', url: 'https://ruraluniv.ac.in/BestPractices?content=BestPractices' },
        { name: 'Former Chancellors', url: 'https://ruraluniv.ac.in/aboutgri?content=FormerChancellors' },
        { name: 'Former Vice-Chancellors', url: 'https://ruraluniv.ac.in/aboutgri?content=FormerViceChancellors' },
        { name: 'Campus Profile & Emblem', url: 'https://ruraluniv.ac.in/aboutgri?content=campus' },
        { name: 'Interactive Campus Map', url: 'https://ruraluniv.ac.in/includes/aboutgri/map/map.html' },
        { name: 'Location & How to Reach', url: 'https://ruraluniv.ac.in/gridu?content=location' },
      ],
    },
    {
      id: 'governance',
      title: 'Governance & Statutory Bodies',
      icon: Shield,
      color: '#911C03',
      items: [
        { name: 'Governance System', url: 'https://ruraluniv.ac.in/Governance?content=System' },
        { name: 'Executive Council (BoM / EC)', url: 'https://ruraluniv.ac.in/Governance?content=EC_CompositionFunctions' },
        { name: 'Planning and Monitoring Board', url: 'https://ruraluniv.ac.in/Governance?content=PlanningAndMonitoring_Constitution' },
        { name: 'Finance Committee', url: 'https://ruraluniv.ac.in/Governance?content=FinanceCommittee_Composition' },
        { name: 'Academic Council', url: 'https://ruraluniv.ac.in/Governance?content=AcademicCouncil_Composition' },
      ],
    },
    {
      id: 'admin',
      title: 'Administration',
      icon: Users,
      color: '#0D47A1',
      items: [
        { name: 'Chancellor', url: 'https://ruraluniv.ac.in/administration?content=chancellor' },
        { name: 'Vice-Chancellor', url: 'https://ruraluniv.ac.in/administration?content=vc' },
        { name: 'Registrar', url: 'https://ruraluniv.ac.in/administration?content=registrar' },
        { name: 'Controller of Examinations (CoE)', url: 'https://ruraluniv.ac.in/administration?content=coe' },
        { name: 'Finance Officer', url: 'https://ruraluniv.ac.in/administration?content=financeofficer' },
        { name: 'Chief Vigilance Officer (CVO)', url: 'https://ruraluniv.ac.in/administration?content=VigilanceOfficer' },
        { name: 'Deans of Schools Directory', url: 'https://ruraluniv.ac.in/administration?content=deans' },
        { name: 'Heads of Departments (HODs)', url: 'https://ruraluniv.ac.in/administration?content=hod' },
        { name: 'Officers in Administration', url: 'https://ruraluniv.ac.in/administration?content=officers' },
      ],
    },
    {
      id: 'academics',
      title: 'Academics & Schools',
      icon: BookOpen,
      color: '#F16236',
      items: [
        { name: 'Choice Based Credit System (CBCS)', url: 'https://ruraluniv.ac.in/academics?content=CBCSsystem' },
        { name: 'Academic Programmes Offered', url: 'https://ruraluniv.ac.in/academics?content=programmes' },
        { name: 'School of Agriculture & Rural Development', badge: 'School' },
        { name: 'School of Tamil, Indian Languages & Fine Arts', badge: 'School' },
        { name: 'School of Sciences', badge: 'School' },
        { name: 'School of Health Sciences & Rural Sanitation', badge: 'School' },
        { name: 'School of Management Studies', badge: 'School' },
        { name: 'School of Social Sciences', badge: 'School' },
        { name: 'School of Engineering & Technology', badge: 'School' },
        { name: "Centre for Women's Studies", url: 'https://ruraluniv.ac.in/academics?content=womensstudies' },
        { name: 'Centre for Geoinformatics', url: 'https://ruraluniv.ac.in/academics?content=geoinformatics' },
        { name: 'Centre for Social Exclusion and Inclusive Policy (CSEIP)', url: 'https://ruraluniv.ac.in/academics?content=cseip' },
        { name: 'Rural Energy Centre (REC)' },
        { name: 'Krishi Vigyan Kendra (KVK Extension)' },
        { name: 'Research and Development Cell (RDC)' },
        { name: "Student's Handbook & Calendar", url: 'https://ruraluniv.ac.in/academics?content=calendar' },
      ],
    },
    {
      id: 'admissions',
      title: 'Admissions 2026-2027',
      icon: GraduationCap,
      color: '#6A1B9A',
      items: [
        { name: 'Prospectus 2026-27 PDF', url: 'https://www.ruraluniv.ac.in/includes/admissions/2026/pdf/Prospectus_202627.pdf', badge: 'PDF' },
        { name: 'Prospectus 2025-26 PDF', url: 'https://www.ruraluniv.ac.in/includes/admissions/2025/pdf/Prospectus_202526.pdf', badge: 'PDF' },
        { name: 'M.Phil. Regulations', url: 'https://ruraluniv.ac.in/admissions?content=MPhil_Regulations' },
        { name: 'Ph.D. Regulations (July 2026 Batch)', url: 'https://ruraluniv.ac.in/admissions?content=PhD_Regulations' },
        { name: 'D.Sc. and D.Litt. Regulations & Application', url: 'https://ruraluniv.ac.in/admissions?content=Dsc_Regulations' },
        { name: 'Fee Refund Policy', url: 'https://ruraluniv.ac.in/admn1?content=Refund' },
        { name: 'Hostel Fees Details & Refund Policy', url: 'https://ruraluniv.ac.in/admn1?content=Hostel_fee' },
      ],
    },
    {
      id: 'examination',
      title: 'Examination System',
      icon: FileCheck,
      color: '#00838F',
      items: [
        { name: 'Examination Evaluation System', url: 'https://ruraluniv.ac.in/examination?content=ExaminationSystem' },
        { name: 'ESE Time Table for UG/PG/B.Voc.', url: 'https://ruraluniv.ac.in/examtt', badge: 'Tool' },
        { name: 'Application for Official Transcript PDF', url: 'https://ruraluniv.ac.in/includes/exam/Application_Transcript.pdf' },
        { name: 'Application for Duplicate Certificates PDF', url: 'https://ruraluniv.ac.in/includes/exam/DuplicateCertificate.pdf' },
        { name: 'Ph.D. UGC Compliance Certification' },
        { name: 'Online Ph.D. Status Tracking', url: 'https://www.ruraluniv.ac.in/GRIIMS1/' },
        { name: 'e-SANAD Registration Form', url: 'https://www.portal.ruraluniv.ac.in/esanad' },
      ],
    },
    {
      id: 'facilities',
      title: 'Campus Facilities',
      icon: MapPin,
      color: '#33691E',
      items: [
        { name: 'Central Library & OPAC', url: 'https://ruraluniv.ac.in/facilities?content=library' },
        { name: 'Computer Centre & Campus Network', url: 'https://ruraluniv.ac.in/gri?CC=about' },
        { name: 'Internet Browsing Centre' },
        { name: 'Centre for E-content Development (CEDT)' },
        { name: 'Physical Education and Yoga Centre' },
        { name: 'Centre for Nanoscience and Nanotechnology' },
        { name: 'NMR Instrument Facility (Dept. of Chemistry)' },
        { name: 'XRD Structural Analysis Facility' },
        { name: 'UBA GRI Seaweed Startup Incubator Facility' },
        { name: 'GRI Museum & Art Gallery' },
        { name: 'Audio Visual Centre & Lecture Capturing System' },
        { name: 'Central Instrumentation Centre (CIC)' },
        { name: 'Animal House & Business Lab' },
        { name: 'Multipurpose Theatre' },
      ],
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: Building,
      color: '#C2185B',
      items: [
        { name: 'Boys & Girls Hostels' },
        { name: 'University Guest House' },
        { name: 'Health Centre & Emergency Medical Services' },
        { name: 'Campus Canteen & Dining' },
        { name: 'Bank & ATM Facilities' },
        { name: 'Day Care Centre' },
        { name: "Working Women's Hostel" },
        { name: 'Central Examination Hall' },
      ],
    },
    {
      id: 'enews',
      title: 'e-News Archives',
      icon: Archive,
      color: '#E65100',
      items: [
        { name: 'e-News 2026' },
        { name: 'e-News 2025' },
        { name: 'e-News 2024' },
        { name: 'e-News 2023' },
        { name: 'e-News Archive 2015-2022' },
      ],
    },
    {
      id: 'cells',
      title: 'Institutional Cells & Wings',
      icon: Award,
      color: '#1565C0',
      items: [
        { name: 'IQAC (Internal Quality Assurance Cell)', url: 'https://ruraluniv.ac.in/academics?content=iqac' },
        { name: 'IPRC (Intellectual Property Rights Cell)', url: 'https://ruraluniv.ac.in/academics?content=ipr_cell' },
        { name: 'Unnat Bharat Abhiyan (UBA Regional Institute)', url: 'https://ruraluniv.ac.in/cell?content=UBA_RegIns' },
        { name: 'Krishi Vigyan Kendra (KVK)', url: 'https://www.icarkvkdindigul.org/' },
        { name: 'DDU-KK (Deen Dayal Upadhyaya Kaushal Kendra)' },
        { name: 'MMTTC (Teacher Training Centre)' },
        { name: 'Centre for Training and Placement (CTP)' },
        { name: 'Centre for Entrepreneurship Development (CED)' },
        { name: 'Equal Opportunity Cell & Reservation Cell' },
        { name: 'NSS & YRC Cell' },
      ],
    },
    {
      id: 'manuals',
      title: 'Operational Manuals & SOPs',
      icon: Download,
      color: '#00695C',
      items: [
        { name: 'Finance and Accounts Manual PDF' },
        { name: 'Guest House Operational Manual PDF' },
        { name: 'Hostel Manual PDF' },
        { name: 'Working Women Hostel Manual PDF' },
        { name: 'Campus Security Manual PDF' },
        { name: 'Sanitation Works Manual PDF' },
        { name: 'Examination System Manual PDF' },
      ],
    },
  ];

  const filteredSections = navTaxonomy
    .map((section) => {
      const matchingItems = section.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        matchingItems.length > 0
      ) {
        return {
          ...section,
          items: searchQuery ? matchingItems : section.items,
        };
      }
      return null;
    })
    .filter(Boolean) as NavSection[];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Bar */}
      <View className="bg-[#518214] pt-12 pb-4 px-4 flex-row items-center shadow-md">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-white/20 rounded-full mr-3"
        >
          <ChevronLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-bold text-white">GRI Navigation Directory</Text>
          <Text className="text-xs text-emerald-100 font-medium">Complete Official Portal Sitemap</Text>
        </View>
      </View>

      <View className="p-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-white border border-gray-300 rounded-2xl px-3.5 py-2.5 mb-2 shadow-sm">
          <Search size={18} color="#6B7280" />
          <TextInput
            placeholder="Search all 150+ menu nodes & portals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2.5 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {filteredSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = searchQuery ? true : !!expandedSections[section.id];

          return (
            <View key={section.id} className="bg-white rounded-2xl mb-3.5 border border-gray-200 shadow-sm overflow-hidden">
              <TouchableOpacity
                onPress={() => toggleSection(section.id)}
                className="p-4 flex-row items-center justify-between bg-gray-50 border-b border-gray-100"
              >
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="p-2 rounded-xl mr-3" style={{ backgroundColor: `${section.color}15` }}>
                    <Icon size={20} color={section.color} />
                  </View>
                  <Text className="text-sm font-bold text-gray-900 flex-1">{section.title}</Text>
                  <Text className="text-xs font-semibold text-gray-400 mr-2">
                    ({section.items.length})
                  </Text>
                </View>
                {isExpanded ? (
                  <ChevronDown size={18} color="#6B7280" />
                ) : (
                  <ChevronRight size={18} color="#6B7280" />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View className="p-3 bg-white">
                  {section.items.map((sub, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        if (sub.url) {
                          Linking.openURL(sub.url);
                        } else {
                          router.push('/(tabs)/discover');
                        }
                      }}
                      className="py-2.5 px-2 flex-row items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <View className="flex-row items-center flex-1 pr-2">
                        <View className="w-1.5 h-1.5 rounded-full bg-[#518214] mr-2.5" />
                        <Text className="text-xs font-semibold text-gray-800 flex-1">
                          {sub.name}
                        </Text>
                      </View>
                      {sub.badge ? (
                        <Text className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {sub.badge}
                        </Text>
                      ) : (
                        <ExternalLink size={13} color="#9CA3AF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
