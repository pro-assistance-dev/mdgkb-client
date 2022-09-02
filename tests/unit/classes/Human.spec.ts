import ContactInfo from '@/classes/contacts/ContactInfo';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import IHuman from '@/interfaces/IHuman';
import StringsService from '@/services/Strings';

describe('Class Human', () => {
  let human: Human;
  const emptyString = '';
  const item = {
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
      originalName: 'originalName1',
      fileSystemPath: 'fileSystemPath',
      category: 'category',

      url: 'url',
    } as FileInfo,
    photoMini: {
      originalName: 'originalName2',
      fileSystemPath: 'fileSystemPath',
      category: 'category',

      url: 'url',
    } as FileInfo,
    isMale: true,
    dateBirth: new Date(),
    contactInfo: {} as ContactInfo,
    slug: 'slug',
    postIndex: 'postIndex',
    address: 'address',
  };

  afterEach(() => {
    human = {} as Human;
  });
  test('Конструктор без параметров создаёт объект с пустыми свойствами', () => {
    human = new Human();

    expect(human.id).toBeUndefined();
    expect(human.name).toBe(emptyString);
    expect(human.surname).toBe(emptyString);
    expect(human.patronymic).toBe(emptyString);
    expect(human.citizenship).toBe(emptyString);
    expect(human.placeBirth).toBe(emptyString);
    expect(human.carNumber).toBe(emptyString);
    expect(human.carModel).toBe(emptyString);
    expect(human.snils).toBe(emptyString);
    expect(human.photoId).toBeUndefined();
    expect(human.photo).toBeInstanceOf(FileInfo);
    expect(human.photoMiniId).toBeUndefined();
    expect(human.photoMini).toBeInstanceOf(FileInfo);
    expect(human.isMale).toBeTruthy();
    expect(human.dateBirth.getDate()).toEqual(new Date().getDate());
    expect(human.contactInfo).toBeInstanceOf(ContactInfo);
    expect(human.slug).toBe(emptyString);
    expect(human.postIndex).toBe(emptyString);
    expect(human.address).toBe(emptyString);
  });
  test('Конструктор корректно заполняет свойства объекта', () => {
    human = new Human(item as IHuman);

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
    expect(human.photoMini).toBeInstanceOf(FileInfo);
    expect(human.isMale).toBeTruthy();
    expect(human.dateBirth.getDate()).toEqual(item.dateBirth.getDate());
    expect(human.contactInfo).toBeInstanceOf(ContactInfo);
    expect(human.slug).toBe(item.slug);
    expect(human.postIndex).toBe(item.postIndex);
    expect(human.address).toBe(item.address);
  });
  test('getFullName()', () => {
    human = new Human(item as IHuman);
    expect(human.getFullName()).toEqual(`${item.surname} ${item.name} ${item.patronymic}`);
  });
  test('getGender()', () => {
    human = new Human(item as IHuman);
    expect(human.getGender()).toEqual('М');
    expect(human.getGender(true)).toEqual('Мужской');
    item.isMale = false;
    human = new Human(item as IHuman);
    expect(human.getGender()).toEqual('Ж');
    expect(human.getGender(true)).toEqual('Женский');
  });
  test('capitalizeName()', () => {
    human = new Human(item as IHuman);
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
    human = new Human(item as IHuman);
    human.trimName();
    expect(human.name.length).toEqual(nameLength - 1);
    expect(human.surname.length).toEqual(surnameLength - 1);
    expect(human.patronymic.length).toEqual(patronymicLength - 1);
  });
  test('getFileInfos() + removePhoto() + removePhotoMini()', () => {
    human = new Human(item as IHuman);
    expect(human.getFileInfos().length).toEqual(2);
    expect(human.getFileInfos()[0].originalName).toEqual('originalName1');
    human.removePhoto();
    expect(human.getFileInfos()[0].originalName).toEqual('');
    human.removePhotoMini();
    expect(human.getFileInfos()[1].originalName).toEqual('');
  });
});
