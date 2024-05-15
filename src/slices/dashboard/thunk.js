import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { Fetch } from '../../helpers/fetchWrapper';
import { GET_ALL_DASHBOARD_CARDS } from '../../helpers/url_helper';

const dashboardThunk = {
  url: `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/dashboard`,

  getDashboardCards: createAsyncThunk('dashboard/getAllDashboardCards', async ({ startDate = '', endDate = '' }) => {
    try {
      let res = await Fetch.get(
        `${dashboardThunk.url}/${GET_ALL_DASHBOARD_CARDS}?startDate=${startDate}&endDate=${endDate}`,
      );
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();
        return res?.analytics;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),
};

export default dashboardThunk;
