import ContactInfo from '@/classes/contacts/ContactInfo';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import IHuman from '@/interfaces/IHuman';
import StringsService from '@/services/Strings';

import EmptyVariables from '../../__mocks__/EmptyVariables';
const sourceItem = {
  id: '06950b91-62bf-4183-8a4f-2756dacaf32c',
  name: 'Имя',
  surname: 'Фамилия',
  patronymic: 'Отчество',
  citizenship: 'citizenship',
  placeBirth: 'placeBirth',
  carNumber: 'carNumber',
  carModel: 'carModel',
  snils: 'snils',
  photo: {
    id: 'id',
    originalName: 'originalName1',
    fileSystemPath: 'fileSystemPath',
    category: 'category',

    url: 'url',
  } as FileInfo | undefined,
  photoId: 'id',
  photoMini: {
    id: 'id',
    originalName: 'originalName2',
    fileSystemPath: 'fileSystemPath',
    category: 'category',

    url: 'url',
  } as FileInfo | undefined,
  photoMiniId: 'id',
  isMale: true,
  dateBirth: new Date(),
  contactInfo: {
    id: 'id',
  } as ContactInfo | undefined,
  slug: 'slug',
  postIndex: 'postIndex',
  address: 'address',
};
describe('Class Human', () => {
  let human: Human;
  let item = sourceItem;

  afterEach(() => {
    human = {} as Human;
    item = {
      id: '06950b91-62bf-4183-8a4f-2756dacaf32c',
      name: 'Имя',
      surname: 'Фамилия',
      patronymic: 'Отчество',
      citizenship: 'citizenship',
      placeBirth: 'placeBirth',
      carNumber: 'carNumber',
      carModel: 'carModel',
      snils: 'snils',
      photo: {
        id: 'id',
        originalName: 'originalName1',
        fileSystemPath: 'fileSystemPath',
        category: 'category',

        url: 'url',
      } as FileInfo | undefined,
      photoId: 'id',
      photoMini: {
        id: 'id',
        originalName: 'originalName2',
        fileSystemPath: 'fileSystemPath',
        category: 'category',

        url: 'url',
      } as FileInfo | undefined,
      photoMiniId: 'id',
      isMale: true,
      dateBirth: new Date(),
      contactInfo: {
        id: 'id',
      } as ContactInfo | undefined,
      slug: 'slug',
      postIndex: 'postIndex',
      address: 'address',
    };
  });

  test('Empty constructor => empty class', () => {
    human = new Human();

    expect(human.id).toBeUndefined();
    expect(human.name).toBe(EmptyVariables.emptyString);
    expect(human.surname).toBe(EmptyVariables.emptyString);
    expect(human.patronymic).toBe(EmptyVariables.emptyString);
    expect(human.citizenship).toBe(EmptyVariables.emptyString);
    expect(human.placeBirth).toBe(EmptyVariables.emptyString);
    expect(human.carNumber).toBe(EmptyVariables.emptyString);
    expect(human.carModel).toBe(EmptyVariables.emptyString);
    expect(human.snils).toBe(EmptyVariables.emptyString);
    expect(human.photoId).toBeUndefined();
    expect(human.photo).toBeInstanceOf(FileInfo);
    expect(human.photo.id).toBeUndefined();
    expect(human.photoMiniId).toBeUndefined();
    expect(human.photoMini).toBeInstanceOf(FileInfo);
    expect(human.photoMini.id).toBeUndefined();
    expect(human.isMale).toBeTruthy();
    expect(human.dateBirth.getDate()).toEqual(new Date().getDate());
    expect(human.contactInfo).toBeInstanceOf(ContactInfo);
    expect(human.contactInfo.id).toBeUndefined();
    expect(human.slug).toBe(EmptyVariables.emptyString);
    expect(human.postIndex).toBe(EmptyVariables.emptyString);
    expect(human.address).toBe(EmptyVariables.emptyString);
  });
  test('Correct constructor construct', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.id).toBe(item.id);
    expect(human.name).toBe(item.name);
    expect(human.surname).toBe(item.surname);
    expect(human.patronymic).toBe(item.patronymic);
    expect(human.citizenship).toBe(item.citizenship);
    expect(human.placeBirth).toBe(item.placeBirth);
    expect(human.carNumber).toBe(item.carNumber);
    expect(human.carModel).toBe(item.carModel);
    expect(human.snils).toBe(item.snils);
    expect(human.photo).toBeInstanceOf(FileInfo);
    expect(human.photo.id).toEqual('id');
    expect(human.photoMini).toBeInstanceOf(FileInfo);
    expect(human.photoMini.id).toEqual('id');
    expect(human.isMale).toBeTruthy();
    expect(human.dateBirth.getDate()).toEqual(item.dateBirth.getDate());
    expect(human.contactInfo).toBeInstanceOf(ContactInfo);
    expect(human.contactInfo.id).toEqual('id');
    expect(human.slug).toBe(item.slug);
    expect(human.postIndex).toBe(item.postIndex);
    expect(human.address).toBe(item.address);
  });

  test('Constructor with params without objects get undefined ids', () => {
    item.contactInfo = undefined;
    item.photo = undefined;
    item.photoMini = undefined;
    human = new Human(item as unknown as IHuman);
    expect(human.photo.id).toBeUndefined();
    expect(human.photoMini.id).toBeUndefined();
    expect(human.contactInfo.id).toBeUndefined();
  });

  test('getFullName()', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.getFullName()).toEqual(`${item.surname} ${item.name} ${item.patronymic}`);
  });
  test('getGender()', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.getGender()).toEqual('М');
    expect(human.getGender(true)).toEqual('Мужской');
    item.isMale = false;
    human = new Human(item as unknown as IHuman);
    expect(human.getGender()).toEqual('Ж');
    expect(human.getGender(true)).toEqual('Женский');
  });
  test('capitalizeName()', () => {
    human = new Human(item as unknown as IHuman);
    human.capitalizeName();
    expect(human.name).toEqual(StringsService.capitalizeString(item.name));
    expect(human.surname).toEqual(StringsService.capitalizeString(item.surname));
    expect(human.patronymic).toEqual(StringsService.capitalizeString(item.patronymic));
  });
  test('trimName()', () => {
    item.name = item.name + ' ';
    const nameLength = item.name.length;
    item.surname = item.surname + ' ';
    const surnameLength = item.surname.length;
    item.patronymic = item.patronymic + ' ';
    const patronymicLength = item.patronymic.length;
    human = new Human(item as unknown as IHuman);
    human.trimName();
    expect(human.name.length).toEqual(nameLength - 1);
    expect(human.surname.length).toEqual(surnameLength - 1);
    expect(human.patronymic.length).toEqual(patronymicLength - 1);
  });
  test('getFileInfos() + removePhoto() + removePhotoMini()', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.getFileInfos().length).toEqual(2);
    expect(human.getFileInfos()[0].originalName).toEqual('originalName1');
    human.removePhoto();
    expect(human.getFileInfos()[0].originalName).toEqual('');
    human.removePhotoMini();
    expect(human.getFileInfos()[1].originalName).toEqual('');
  });

  test('sanitize name get capitalize and not spaced name', () => {
    human = new Human(item as unknown as IHuman);
    human.surname = ' surname ';
    human.name = ' name ';
    human.patronymic = ' patronymic ';

    expect(human.getFullName()).toEqual(' surname   name   patronymic ');
    human.sanitizeName();
    expect(human.getFullName()).toEqual('Surname Name Patronymic');
  });

  test('Remove photo get empty object photo and photoId undefined', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.photo.id).toEqual('id');
    expect(human.photoId).toEqual('id');
    human.removePhoto();
    expect(human.photo.id).toBeUndefined();
    expect(human.photoId).toBeUndefined();
  });
  test('Remove photoMini get empty object photoMini and photoMiniId undefined', () => {
    human = new Human(item as unknown as IHuman);
    expect(human.photoMini.id).toEqual('id');
    expect(human.photoMiniId).toEqual('id');
    human.removePhotoMini();
    expect(human.photoMini.id).toBeUndefined();
    expect(human.photoMiniId).toBeUndefined();
  });
});
