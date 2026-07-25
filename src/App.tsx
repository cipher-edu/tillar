import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { HistoryPage } from '@/pages/faculty/HistoryPage';
import { LeadershipPage } from '@/pages/faculty/LeadershipPage';
import { StructurePage } from '@/pages/faculty/StructurePage';
import { HonoraryPage } from '@/pages/faculty/HonoraryPage';
import { ProgramsPage } from '@/pages/education/ProgramsPage';
import { CurriculaPage } from '@/pages/education/CurriculaPage';
import { ProfessorsPage } from '@/pages/community/ProfessorsPage';
import { TutorsPage } from '@/pages/community/TutorsPage';
import { StudentsPage } from '@/pages/students/StudentsPage';
import { SciencePage } from '@/pages/science/SciencePage';
import { NewsPage } from '@/pages/news/NewsPage';
import { ContactPage } from '@/pages/ContactPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="fakultet/tarix" element={<HistoryPage />} />
            <Route path="fakultet/rahbariyat" element={<LeadershipPage />} />
            <Route path="fakultet/rahbariyat/:slug" element={<LeadershipPage />} />
            <Route path="fakultet/tuzilma" element={<StructurePage />} />
            <Route path="fakultet/tuzilma/:slug" element={<StructurePage />} />
            <Route path="fakultet/faxriy-ustozlar" element={<HonoraryPage />} />
            <Route path="talim/yonalishlar" element={<ProgramsPage />} />
            <Route path="talim/yonalishlar/:slug" element={<ProgramsPage />} />
            <Route path="talim/oquv-rejalar" element={<CurriculaPage />} />
            <Route path="jamoa/professorlar" element={<ProfessorsPage />} />
            <Route path="jamoa/professorlar/:slug" element={<ProfessorsPage />} />
            <Route path="jamoa/tyutorlar" element={<TutorsPage />} />
            <Route path="jamoa/tyutorlar/:slug" element={<TutorsPage />} />
            <Route path="jamoa/tyutorlar/:slug/guruh/:groupId" element={<TutorsPage />} />
            <Route path="talabalar" element={<StudentsPage />} />
            <Route path="talabalar/:slug" element={<StudentsPage />} />
            <Route path="ilm-fan" element={<SciencePage />} />
            <Route path="ilm-fan/loyihalar/:slug" element={<SciencePage />} />
            <Route path="yangiliklar" element={<NewsPage />} />
            <Route path="yangiliklar/:slug" element={<NewsPage />} />
            <Route path="aloqa" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
