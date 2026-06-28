import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PreviewIndex from './preview/index';
import StylesPreview from './preview/styles';
import AtomsPreview from './preview/atoms';
import MoleculesPreview from './preview/molecules';
import OrganismsPreview from './preview/organisms';
import ScreenAllTeamsA from './preview/pages/ScreenAllTeamsA';
import ScreenAllTeamsSingle from './preview/pages/ScreenAllTeamsSingle';
import ScreenCandidateB from './preview/pages/ScreenCandidateB';
import ReleaseNotes from './preview/release-notes';

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
        <Route path="/preview/pages/screen-all-teams-a" element={<ScreenAllTeamsA />} />
        <Route path="/preview/pages/screen-all-teams-single" element={<ScreenAllTeamsSingle />} />
        <Route path="/preview/pages/screen-candidate-b" element={<ScreenCandidateB />} />
        <Route path="/preview/release-notes" element={<ReleaseNotes />} />
      </Routes>
    </BrowserRouter>
  );
}
