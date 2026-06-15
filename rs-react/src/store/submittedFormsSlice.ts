import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FormValuesData } from '../types/forms';

export type SubmittedForm = {
  id: string;
  formType: 'uncontrolled' | 'RHF';
  data: FormValuesData;
  createdAt: string;
  isNew?: boolean;
};

type SubmittedFormsState = {
  items: SubmittedForm[];
};

const initialState: SubmittedFormsState = {
  items: [],
};

const submittedFormsSlice = createSlice({
  name: 'submittedForms',
  initialState,
  reducers: {
    addSubmittedForm: (state, action: PayloadAction<SubmittedForm>) => {
      state.items.push({ ...action.payload, isNew: true });
    },

    markAsOld: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.isNew = false;
    },
  },
});

export const { addSubmittedForm, markAsOld } = submittedFormsSlice.actions;
export default submittedFormsSlice.reducer;
