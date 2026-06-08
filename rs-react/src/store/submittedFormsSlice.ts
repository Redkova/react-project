import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SubmittedForm = {
  id: string;
  formType: 'uncontrolled' | 'rhf';
  data: Record<string, unknown> & {
    fileBase64?: string | null;
  };
  createdAt: string;
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
      state.items.push(action.payload);
    },
  },
});

export const { addSubmittedForm } = submittedFormsSlice.actions;
export default submittedFormsSlice.reducer;
