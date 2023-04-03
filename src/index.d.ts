import sanitizeHTML from 'sanitize-html';

import carouselSwipe from '@/services/CarouselSwipe';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import scroll from '@/services/Scroll';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dateTimeFormatter: DateTimeFormatter;
    $classHelper: ClassHelper;
    $sanitize: typeof sanitizeHTML;
    $scroll: typeof scroll;
    $carouselSwipe: typeof carouselSwipe;
    $dataTypes: typeof DataTypes;
    $operators: typeof Operators;
  }
}
