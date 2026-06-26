import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PreviewIndex from './preview/index';
import StylesPreview from './preview/styles';
import AtomsPreview from './preview/atoms';
import MoleculesPreview from './preview/molecules';
import OrganismsPreview from './preview/organisms';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/preview" replace />} />
        <Route path="/preview" element={<PreviewIndex />} />
        <Route path="/preview/styles" element={<StylesPreview />} />
        <Route path="/preview/atoms" element={<AtomsPreview />} />
        <Route path="/preview/molecules" element={<MoleculesPreview />} />
        <Route path="/preview/organisms" element={<OrganismsPreview />} />
      </Routes>
    </BrowserRouter>
  );
}
