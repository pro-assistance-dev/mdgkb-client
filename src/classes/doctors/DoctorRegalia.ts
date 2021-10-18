import IDoctorRegalia from '@/interfaces/doctors/IDoctorRegalia';

export default class DoctorRegalia implements IDoctorRegalia {
  id?: string;
  name = '';
  doctorId?: string;

  constructor(doctorRegalia?: IDoctorRegalia) {
    if (!doctorRegalia) {
      return;
    }
    this.id = doctorRegalia.id;
    this.name = doctorRegalia.name;
    this.doctorId = doctorRegalia.doctorId;
  }
}
