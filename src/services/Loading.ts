import Visible from './Visible';

class LoadingC extends Visible {
  Show() {
    super.show();
  }

  Hide() {
    super.hide();
  }
}

const Loading: LoadingC = new LoadingC();
export default Loading;
