import React from 'react';
import { useTranslation } from 'react-i18next';
import EducationID from './EducationID';
import EducationEN from './EducationEN';

const Education = () => {
  const { i18n } = useTranslation();

  return i18n.language === 'en' ? <EducationEN /> : <EducationID />;
};

export default Education;
