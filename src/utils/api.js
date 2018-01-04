import axios from 'axios'

const CHECK_SUM_END_POINT = '/system_settings/check_app_checksum';

const api = {
  fetchChecksumLastUpdatedAt: (appUrl) => (
    axios.get(`${appUrl}${CHECK_SUM_END_POINT}`)
      .then(
        (response) => (response.data)
      ).then(data => data.app_md5_checksum_updated_at)
  )
};

export default api;