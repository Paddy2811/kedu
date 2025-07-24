import fs from 'fs';
import { glob } from 'glob';

// Define the mapping between old keys and new keys
const keyMapping = {
  // Common keys
  'home': 'common.home',
  'search': 'common.search',
  'addNew': 'common.addNew',
  'detail': 'common.detail',
  'edit': 'common.edit',
  'delete': 'common.delete',
  'notImplemented': 'common.notImplemented',
  'featureNotAvailable': 'common.featureNotAvailable',
  'total': 'common.total',
  'no_data': 'common.no_data',
  'name': 'common.name',
  'code': 'common.code',
  'status': 'common.status',
  'cancel': 'common.cancel',
  'save': 'common.save',
  'loading': 'common.loading',
  'retry': 'common.retry',
  'processing': 'common.processing',
  'update': 'common.update',
  'create': 'common.create',
  'saving': 'common.saving',
  'creating': 'common.creating',
  'note': 'common.note',
  'enter_note': 'common.enter_note',
  'enter_note_placeholder': 'common.enter_note_placeholder',
  'add_new': 'common.addNew',

  // Auth keys
  'login': 'auth.login',
  'login_description': 'auth.login_description',
  'username': 'auth.username',
  'username_placeholder': 'auth.username_placeholder',
  'password': 'auth.password',
  'password_placeholder': 'auth.password_placeholder',
  'forgot_password': 'auth.forgot_password',
  'login_button': 'auth.login_button',
  'logging_in': 'auth.logging_in',
  'show_password': 'auth.show_password',
  'hide_password': 'auth.hide_password',
  'username_required': 'auth.username_required',
  'password_required': 'auth.password_required',

  // Error keys
  'errors.generic': 'errors.generic',
  'errors.load_student': 'errors.load_student',
  'errors.load_staff': 'errors.load_staff',
  'errors.load_course_list': 'errors.load_course_list',
  'errors.load_course_detail': 'errors.load_course_detail',
  'errors.load_class_list': 'errors.load_class_list',
  'errors.load_class_detail': 'errors.load_class_detail',
  'errors.delete_staff': 'errors.delete_staff',
  'errors.delete_course': 'errors.delete_course',
  'errors.load_facility_list': 'errors.load_facility_list',
  'errors.create_facility': 'errors.create_facility',
  'errors.update_facility': 'errors.update_facility',
  'errors.duplicate_code': 'errors.duplicate_code',
  'errors.invalid_code': 'errors.invalid_code',
  'errors.load_select_data': 'errors.load_select_data',
  'errors.required_fields': 'errors.required_fields',
  'errors.load_students': 'errors.load_students',
  'errors.login_failed': 'errors.login_failed',
  'errors.load_facilities': 'errors.load_facilities',
  'errors.load_sessions': 'errors.load_sessions',
  'errors.register_students': 'errors.register_students',
  'errors.create_student': 'errors.create_student',
  'errors.load_transaction_list': 'errors.load_transaction_list',
  'error.staffList': 'errors.staffList',

  // Success keys
  'copy_phone_success': 'success.copy_phone_success',
  'copy_email_success': 'success.copy_email_success',
  'success.deleteCourse': 'success.deleteCourse',
  'success.deleteStaff': 'success.deleteStaff',
  'success.createCourse': 'success.createCourse',
  'success.updateCourse': 'success.updateCourse',
  'success.createFacility': 'success.createFacility',
  'success.updateFacility': 'success.updateFacility',
  'success.createStaff': 'success.createStaff',
  'success.updateStaff': 'success.updateStaff',
  'success.createClass': 'success.createClass',
  'success.updateClass': 'success.updateClass',
  'success.setup_schedule': 'success.setup_schedule',
  'success.register_students': 'success.register_students',
  'success.createStudent': 'success.createStudent',
  'success.registration_success': 'success.registration_success',
  'payment_created_success': 'success.payment_created_success',
  'payment_updated_success': 'success.payment_updated_success',
  'receipt_updated_success': 'success.receipt_updated_success',
  'discount_updated': 'success.discount_updated',

  // Error messages
  'copy_error': 'error.copy_error',
  'payment_creation_error': 'error.payment_creation_error',
  'payment_update_error': 'error.payment_update_error',
  'receipt_update_error': 'error.receipt_update_error',

  // Validation keys
  'validation.required_name': 'validation.required_name',
  'validation.required_code': 'validation.required_code',
  'validation.required_address': 'validation.required_address',
  'validation.required_province': 'validation.required_province',
  'validation.required_district': 'validation.required_district',
  'validation.required_phone': 'validation.required_phone',
  'validation.required_fields': 'validation.required_fields',
  'error_missing_payment_type': 'validation.error_missing_payment_type',
  'error_missing_payment_amount': 'validation.error_missing_payment_amount',
  'error_missing_payment_method': 'validation.error_missing_payment_method',
  'error_missing_receiver_group': 'validation.error_missing_receiver_group',
  'error_missing_receiver': 'validation.error_missing_receiver',

  // Personal info keys
  'phone': 'personal.phone',
  'phone_student': 'personal.phone_student',
  'phone_staff': 'personal.phone_staff',
  'student_code': 'personal.student_code',
  'staff_code': 'personal.staff_code',
  'email': 'personal.email',
  'gender': 'personal.gender',
  'dob': 'personal.dob',
  'address': 'personal.address',
  'personal_info': 'personal.personal_info',
  'contact_information': 'personal.contact_information',
  'contact_info': 'personal.contact_info',
  'notes_comments': 'personal.notes_comments',
  'full_name': 'personal.full_name',
  'enter_full_name_placeholder': 'personal.enter_full_name_placeholder',
  'phone_number': 'personal.phone_number',
  'enter_phone_placeholder': 'personal.enter_phone_placeholder',
  'enter_email_placeholder': 'personal.enter_email_placeholder',
  'select_dob_placeholder': 'personal.select_dob_placeholder',
  'select_gender_placeholder': 'personal.select_gender_placeholder',
  'address_specific': 'personal.address_specific',
  'emergency_contact': 'personal.emergency_contact',

  // Staff keys
  'staff_list': 'staff.staff_list',
  'staff': 'staff.staff',
  'search_staff_placeholder': 'staff.search_staff_placeholder',
  'staff_name': 'staff.staff_name',
  'staff_detail': 'staff.staff_detail',
  'unassigned_role': 'staff.unassigned_role',
  'role': 'staff.role',
  'permissions_group': 'staff.permissions_group',
  'update_staff': 'staff.update_staff',
  'create_staff': 'staff.create_staff',

  // Student keys
  'student_list': 'student.student_list',
  'student_detail': 'student.student_detail',
  'students': 'student.students',
  'students_plural': 'student.students_plural',
  'student_count': 'student.student_count',
  'no_student_data': 'student.no_student_data',
  'loading_students': 'student.loading_students',
  'unnamed_student': 'student.unnamed_student',
  'create_student': 'student.create_student',
  'selected_students': 'student.selected_students',
  'student_already_selected': 'student.student_already_selected',
  'select_students_warning': 'student.select_students_warning',
  'add_student_prompt': 'student.add_student_prompt',
  'student_name': 'student.student_name',
  'search_student_placeholder': 'student.search_student_placeholder',
  'enter_student_full_name_placeholder': 'student.enter_student_full_name_placeholder',
  'student_count_unit': 'student.student_count_unit',
  'add_student': 'student.add_student',

  // Course keys
  'courses': 'course.courses',
  'course_list': 'course.course_list',
  'search_course_placeholder': 'course.search_course_placeholder',
  'course_name': 'course.course_name',
  'course_detail': 'course.course_detail',
  'course_information': 'course.course_information',
  'create_course': 'course.create_course',
  'update_course': 'course.update_course',
  'delete_course_confirm': 'course.delete_course_confirm',
  'total_classes': 'course.total_classes',
  'not_found_course': 'course.not_found_course',
  'course': 'course.course',
  'min_search_chars_warning': 'course.min_search_chars_warning',

  // Class keys
  'class': 'class.class',
  'classes': 'class.classes',
  'class_list': 'class.class_list',
  'class_name': 'class.class_name',
  'class_code': 'class.class_code',
  'class_detail': 'class.class_detail',
  'class_status': 'class.class_status',
  'create_class': 'class.create_class',
  'update_class': 'class.update_class',
  'delete_class_confirm': 'class.delete_class_confirm',
  'search_class_placeholder': 'class.search_class_placeholder',
  'select_class_placeholder': 'class.select_class_placeholder',
  'no_classes_available': 'class.no_classes_available',
  'no_classes_found': 'class.no_classes_found',
  'no_classes': 'class.no_classes',
  'class_count_unit': 'class.class_count_unit',
  'enter_class_name_placeholder': 'class.enter_class_name_placeholder',
  'enter_class_code_placeholder': 'class.enter_class_code_placeholder',
  'pending_status': 'class.pending_status',
  'active_status': 'class.active_status',
  'completed_status': 'class.completed_status',
  'start_class': 'class.start_class',
  'enrollment': 'class.enrollment',
  'class_already_selected': 'class.class_already_selected',
  'class_already_selected_short': 'class.class_already_selected_short',
  'class_full': 'class.class_full',
  'class_full_short': 'class.class_full_short',
  'select_class_warning': 'class.select_class_warning',
  'no_class_selected': 'class.no_class_selected',
  'select_class_prompt': 'class.select_class_prompt',
  'unnamed_class': 'class.unnamed_class',
  'already_registered': 'class.already_registered',
  'add_new_class': 'class.add_new_class',
  'class_size': 'class.class_size',
  'no_classes_subtitle': 'class.no_classes_subtitle',

  // Subject keys
  'subject': 'subject.subject',
  'select_subject_placeholder': 'subject.select_subject_placeholder',
  'category': 'subject.category',
  'enter_category_placeholder': 'subject.enter_category_placeholder',
  'level': 'subject.level',
  'select_level_placeholder': 'subject.select_level_placeholder',

  // Schedule keys
  'schedule': 'schedule.schedule',
  'no_schedule': 'schedule.no_schedule',
  'start_journey_by_adding_session': 'schedule.start_journey_by_adding_session',
  'setup_schedule': 'schedule.setup_schedule',
  'setup_schedule_description': 'schedule.setup_schedule_description',
  'end_date_expected': 'schedule.end_date_expected',
  'day': 'schedule.day',
  'select_day': 'schedule.select_day',
  'start_time': 'schedule.start_time',
  'select_time': 'schedule.select_time',
  'enter_duration': 'schedule.enter_duration',
  'session': 'schedule.session',
  'session_count': 'schedule.session_count',
  'session_count_unit': 'schedule.session_count_unit',
  'total_sessions_label': 'schedule.total_sessions_label',
  'minute_unit': 'schedule.minute_unit',
  'duration': 'schedule.duration',
  'session_duration': 'schedule.session_duration',
  'enter_session_duration_placeholder': 'schedule.enter_session_duration_placeholder',
  'enter_total_sessions_placeholder': 'schedule.enter_total_sessions_placeholder',

  // Teacher keys
  'teacher': 'teacher.teacher',
  'select_teacher_placeholder': 'teacher.select_teacher_placeholder',

  // Facility keys
  'facility': 'facility.facility',
  'facility_list': 'facility.facility_list',
  'search_facility_placeholder': 'facility.search_facility_placeholder',
  'facility_code': 'facility.facility_code',
  'district': 'facility.district',
  'province': 'facility.province',
  'total_facilities': 'facility.total_facilities',
  'create_facility': 'facility.create_facility',
  'edit_facility': 'facility.edit_facility',
  'facility_name': 'facility.facility_name',
  'ward': 'facility.ward',
  'facility_create_description': 'facility.facility_create_description',
  'facility_edit_description': 'facility.facility_edit_description',
  'select_province_placeholder': 'facility.select_province_placeholder',
  'select_district_placeholder': 'facility.select_district_placeholder',
  'select_ward_placeholder': 'facility.select_ward_placeholder',
  'enter_facility_name_placeholder': 'facility.enter_facility_name_placeholder',
  'enter_facility_code_placeholder': 'facility.enter_facility_code_placeholder',
  'enter_address_placeholder': 'facility.enter_address_placeholder',
  'select_facility_placeholder': 'facility.select_facility_placeholder',

  // Finance keys
  'price': 'finance.price',
  'price_per_session': 'finance.price_per_session',
  'total_price': 'finance.total_price',
  'tuition_fee': 'finance.tuition_fee',
  'total_tuition_fee': 'finance.total_tuition_fee',
  'currency': 'finance.currency',
  'per_session_suffix': 'finance.per_session_suffix',
  'currency_per_session': 'finance.currency_per_session',
  'enter_price_per_session_placeholder': 'finance.enter_price_per_session_placeholder',
  'session_unit': 'finance.session_unit',
  'max_student_count': 'finance.max_student_count',
  'enter_max_student_count_placeholder': 'finance.enter_max_student_count_placeholder',
  'enter_total_price_placeholder': 'finance.enter_total_price_placeholder',

  // Registration keys
  'register_student': 'registration.register_student',
  'step_1_select_student': 'registration.step_1_select_student',
  'select_student_placeholder': 'registration.select_student_placeholder',
  'step_2_select_class': 'registration.step_2_select_class',
  'no_code': 'registration.no_code',
  'no_phone': 'registration.no_phone',
  'stt': 'registration.stt',
  'confirm_registration': 'registration.confirm_registration',
  'progress': 'registration.progress',
  'finish': 'registration.finish',
  'info': 'registration.info',
  'opening_date': 'registration.opening_date',
  'select_opening_date_placeholder': 'registration.select_opening_date_placeholder',
  'enrollment.registration_info': 'registration.enrollment.registration_info',
  'enrollment.temporary_fee': 'registration.enrollment.temporary_fee',
  'enrollment.discount': 'registration.enrollment.discount',
  'enrollment.custom_discount': 'registration.enrollment.custom_discount',
  'enrollment.add_discount_order': 'registration.enrollment.add_discount_order',
  'enrollment.edit_discount_order': 'registration.enrollment.edit_discount_order',

  // Transaction keys
  'transaction_list': 'transaction.transaction_list',
  'search_by_code': 'transaction.search_by_code',
  'filter_transactions': 'transaction.filter_transactions',
  'create_receipt': 'transaction.create_receipt',
  'create_payment': 'transaction.create_payment',
  'transactions': 'transaction.transactions',
  'no_transactions': 'transaction.no_transactions',
  'no_transactions_subtitle': 'transaction.no_transactions_subtitle',
  'transaction_date': 'transaction.transaction_date',
  'transaction_code': 'transaction.transaction_code',
  'transaction_type': 'transaction.transaction_type',
  'transaction_reason': 'transaction.transaction_reason',
  'transaction_amount': 'transaction.transaction_amount',
  'transaction_status': 'transaction.transaction_status',
  'transaction_type_receipt': 'transaction.transaction_type_receipt',
  'transaction_type_payment': 'transaction.transaction_type_payment',
  'transaction_status_confirmed': 'transaction.transaction_status_confirmed',
  'transaction_status_pending': 'transaction.transaction_status_pending',
  'transaction_status_cancelled': 'transaction.transaction_status_cancelled',
  'create_new_payment': 'transaction.create_new_payment',
  'create_new_payment_description': 'transaction.create_new_payment_description',
  'payment_code': 'transaction.payment_code',
  'created_by': 'transaction.created_by',
  'created_date': 'transaction.created_date',
  'payment_date': 'transaction.payment_date',
  'payment_time': 'transaction.payment_time',
  'payment_type': 'transaction.payment_type',
  'payment_amount': 'transaction.payment_amount',
  'payment_method': 'transaction.payment_method',
  'receiver_group': 'transaction.receiver_group',
  'receiver': 'transaction.receiver',
  'edit_payment': 'transaction.edit_payment',
  'edit_payment_description': 'transaction.edit_payment_description',
  'edit_receipt': 'transaction.edit_receipt',
  'edit_receipt_description': 'transaction.edit_receipt_description',
  'payment_type_salary': 'transaction.payment_type_salary',
  'payment_type_rent': 'transaction.payment_type_rent',
  'payment_type_utility': 'transaction.payment_type_utility',
  'payment_type_supply': 'transaction.payment_type_supply',
  'payment_type_other': 'transaction.payment_type_other',
  'payment_method_cash': 'transaction.payment_method_cash',
  'payment_method_bank_transfer': 'transaction.payment_method_bank_transfer',
  'receiver_group_staff': 'transaction.receiver_group_staff',
  'receiver_group_vendor': 'transaction.receiver_group_vendor',
  'receiver_group_other': 'transaction.receiver_group_other',
  'select_payment_type': 'transaction.select_payment_type',
  'select_payment_method': 'transaction.select_payment_method',
  'select_receiver_group': 'transaction.select_receiver_group',
  'select_receiver': 'transaction.select_receiver',

  // Product keys
  'product_list': 'product.product_list',
  'search_product_placeholder': 'product.search_product_placeholder',
  'product_name': 'product.product_name',
  'product_code': 'product.product_code',
  'product_type': 'product.product_type',
  'unit': 'product.unit',
  'total_products': 'product.total_products',
  'create_product': 'product.create_product',
  'edit_product': 'product.edit_product',
  'delete_product_confirm': 'product.delete_product_confirm',
  'product_detail': 'product.product_detail'
};

// Function to process a file and update i18n keys
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if the file contains useTranslation import
    if (!content.includes('useTranslation') && !content.includes('t(')) {
      return { filePath, modified: false };
    }

    // Replace t('key') patterns
    for (const [oldKey, newKey] of Object.entries(keyMapping)) {
      // Escape special characters in oldKey for regex
      const escapedOldKey = oldKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Match t('oldKey') or t("oldKey") patterns
      const singleQuoteRegex = new RegExp(`t\\('${escapedOldKey}'\\)`, 'g');
      const doubleQuoteRegex = new RegExp(`t\\("${escapedOldKey}"\\)`, 'g');
      
      // Replace with t('newKey')
      if (content.match(singleQuoteRegex) || content.match(doubleQuoteRegex)) {
        content = content.replace(singleQuoteRegex, `t('${newKey}')`);
        content = content.replace(doubleQuoteRegex, `t("${newKey}")`);
        modified = true;
      }
      
      // Match t('oldKey', {...}) or t("oldKey", {...}) patterns
      const singleQuoteParamsRegex = new RegExp(`t\\('${escapedOldKey}',\\s*\\{`, 'g');
      const doubleQuoteParamsRegex = new RegExp(`t\\("${escapedOldKey}",\\s*\\{`, 'g');
      
      // Replace with t('newKey', {...})
      if (content.match(singleQuoteParamsRegex) || content.match(doubleQuoteParamsRegex)) {
        content = content.replace(singleQuoteParamsRegex, `t('${newKey}', {`);
        content = content.replace(doubleQuoteParamsRegex, `t("${newKey}", {`);
        modified = true;
      }
      
      // Match t('oldKey', "defaultValue") or t("oldKey", "defaultValue") patterns
      const singleQuoteDefaultRegex = new RegExp(`t\\('${escapedOldKey}',\\s*(['"])`, 'g');
      const doubleQuoteDefaultRegex = new RegExp(`t\\("${escapedOldKey}",\\s*(['"])`, 'g');
      
      // Replace with t('newKey', "defaultValue")
      if (content.match(singleQuoteDefaultRegex) || content.match(doubleQuoteDefaultRegex)) {
        content = content.replace(singleQuoteDefaultRegex, `t('${newKey}', $1`);
        content = content.replace(doubleQuoteDefaultRegex, `t("${newKey}", $1`);
        modified = true;
      }
    }

    // Write the modified content back to the file if changes were made
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { filePath, modified: true };
    }

    return { filePath, modified: false };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return { filePath, modified: false, error };
  }
}

// Main function to process all files
async function updateI18nKeys() {
  // Find all JavaScript and JSX files in the src directory
  const files = await glob('src/**/*.{js,jsx}');
  
  let totalModified = 0;
  const modifiedFiles = [];
  const errors = [];

  console.log(`Found ${files.length} files to process`);

  // Process each file
  for (const file of files) {
    const result = processFile(file);
    
    if (result.error) {
      errors.push({ file: result.filePath, error: result.error });
    } else if (result.modified) {
      totalModified++;
      modifiedFiles.push(result.filePath);
      console.log(`Updated i18n keys in: ${result.filePath}`);
    }
  }

  console.log(`\nSummary:`);
  console.log(`- Total files processed: ${files.length}`);
  console.log(`- Files modified: ${totalModified}`);
  console.log(`- Files with errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(({ file, error }) => {
      console.log(`- ${file}: ${error.message}`);
    });
  }

  if (modifiedFiles.length > 0) {
    console.log(`\nModified files:`);
    modifiedFiles.forEach(file => {
      console.log(`- ${file}`);
    });
  }
}

// Run the script
updateI18nKeys().catch(error => {
  console.error('Error running script:', error);
  globalThis.process.exit(1);
}); 