import IDivisionVideo from '@/interfaces/IDivisionVideo';

export default class DivisionVideo implements IDivisionVideo {
  id?: string;
  divisionId?: string;
  youTubeVideoId = '';

  constructor(i?: IDivisionVideo) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.divisionId = i.divisionId;
    this.youTubeVideoId = i.youTubeVideoId;
  }
}
