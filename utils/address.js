import { provinces } from "@/data/vietnam-provinces";

/**
 * Lấy địa chỉ đầy đủ từ các tham số riêng biệt
 * @param {string} address - Địa chỉ chi tiết
 * @param {string} cityCode - Mã tỉnh/thành phố
 * @param {string} districtCode - Mã quận/huyện
 * @param {string} wardCode - Mã phường/xã
 * @returns {string} Địa chỉ đầy đủ (ví dụ: Số 1, ngõ 2, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội)
 */
export function getFullAddress(address, cityCode, districtCode, wardCode) {
  let cityName = '', districtName = '', wardName = '';
  const city = provinces.find(p => p.code === cityCode);
  if (city) {
    cityName = city.name;
    const district = city.districts.find(d => d.code === districtCode);
    if (district) {
      districtName = district.name;
      const ward = district.wards.find(w => w.code === wardCode);
      if (ward) wardName = ward.name;
    }
  }
  return [address, wardName, districtName, cityName].filter(Boolean).join(', ');
} 