import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { ElDialog, ElPopover, ElTag } from 'element-plus';
import { ComponentPublicInstance } from 'vue';

import Form from '@/classes/Form';
import User from '@/classes/User';
import ApplicationTable from '@/components/Profile/ProfileDailyMenuOrders/ApplicationTable.vue';
import DateTimeFormatter from '@/services/DateFormat';

describe('ApplicationTable.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  test('FormValuesList is correct.', async () => {
    // Arrange
    const user = new User();
    user.formValues.push(new Form(), new Form(), new Form(), new Form());
    wrapper = mount(ApplicationTable, {
      attachTo: document.body,
      props: {
        user: user,
      },
      global: {
        mocks: {
          $dateTimeFormatter: new DateTimeFormatter('ru-RU'),
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
        components: {
          'el-tag': ElTag,
          'el-popover': ElPopover,
          'el-dialog': ElDialog,
        },
      },
    });
    // Act
    // Assert
    expect(wrapper.findAll('[data-test="forms-list"]')).toHaveLength(user.formValues.length);
  });
});
