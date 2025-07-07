/**
 * Test ID constants for Playwright E2E testing
 *
 * This file provides a centralized location for all test IDs used in the application.
 * Each test ID follows the naming convention: [context]-[element-type]-[identifier]
 */

export const testIds = {
  // Application-wide elements
  app: {
    root: 'app-root',
    header: 'app-header',
    mainContent: 'app-main-content',
    toaster: 'app-toaster',
  },

  // Authentication elements
  auth: {
    signedOutContainer: 'auth-signed-out-container',
    signedInContainer: 'auth-signed-in-container',
    signInButton: 'auth-sign-in-button',
    signUpTrigger: 'auth-sign-up-trigger',
    signUpButton: 'auth-sign-up-button',
    userButton: 'auth-user-button',
  },

  // Home page elements
  home: {
    container: 'home-page-container',
    main: 'home-page-main',
    logo: 'home-page-logo',
    instructions: 'home-page-instructions',
    instruction1: 'home-page-instruction-1',
    instruction2: 'home-page-instruction-2',
    codeSnippet: 'home-page-code-snippet',
    actions: 'home-page-actions',
    deployLink: 'home-page-deploy-link',
    docsLink: 'home-page-docs-link',
    vercelIcon: 'home-page-vercel-icon',
    footer: 'home-page-footer',
    footerLearn: 'home-page-footer-learn',
    footerExamples: 'home-page-footer-examples',
    footerWebsite: 'home-page-footer-website',
    footerLearnIcon: 'home-page-footer-learn-icon',
    footerExamplesIcon: 'home-page-footer-examples-icon',
    footerWebsiteIcon: 'home-page-footer-website-icon',
  },

  // Globals module elements
  globals: {
    // Page structure
    pageWrapper: 'globals-page-wrapper',
    pageContainer: 'globals-page-container',
    pageHeader: 'globals-page-header',
    pageTitle: 'globals-page-title',
    emptyState: 'globals-empty-state',

    // Table elements
    tableContainer: 'globals-table-container',
    tableHeader: 'globals-table-header',
    tableHeaderRow: 'globals-table-header-row',
    tableHeadKey: 'globals-table-head-key',
    tableHeadValue: 'globals-table-head-value',
    tableHeadActions: 'globals-table-head-actions',
    tableBody: 'globals-table-body',

    // Dynamic table elements (use with parameters)
    tableRow: (key: string) => `globals-table-row-${key}`,
    tableCellKey: (key: string) => `globals-table-cell-key-${key}`,
    tableCellValue: (key: string) => `globals-table-cell-value-${key}`,
    tableCellActions: (key: string) => `globals-table-cell-actions-${key}`,
    tableActions: (key: string) => `globals-table-actions-${key}`,

    // Action buttons
    buttonAdd: 'globals-button-add',
    buttonEdit: (key: string) => `globals-button-edit-${key}`,
    buttonDelete: (key: string) => `globals-button-delete-${key}`,

    // Form elements
    formTrigger: 'globals-form-trigger',
    form: 'globals-form',
    formAddDialog: 'globals-form-add-dialog',
    formEditDialog: 'globals-form-edit-dialog',
    formHeader: 'globals-form-header',
    formTitle: 'globals-form-title',
    formKeyField: 'globals-form-key-field',
    formValueField: 'globals-form-value-field',
    formKeyLabel: 'globals-form-key-label',
    formValueLabel: 'globals-form-value-label',
    formKeyInput: 'globals-form-key-input',
    formValueInput: 'globals-form-value-input',
    formActions: 'globals-form-actions',
    formButtonCancel: 'globals-form-button-cancel',
    formButtonSubmit: 'globals-form-button-submit',

    // Button states
    buttonSaving: 'globals-button-saving',
    buttonReady: 'globals-button-ready',
  },

  // Toast notifications
  toast: {
    addSuccess: 'globals-toast-add-success',
    addError: 'globals-toast-add-error',
    updateSuccess: 'globals-toast-update-success',
    updateError: 'globals-toast-update-error',
    deleteSuccess: 'globals-toast-delete-success',
    deleteError: 'globals-toast-delete-error',
  },
} as const;

/**
 * Helper function to get a test ID from a dot-notation path
 *
 * @example
 * getTestId('globals.buttonAdd') // returns 'globals-button-add'
 * getTestId('auth.signInButton') // returns 'auth-sign-in-button'
 */
export const getTestId = (path: string): string => {
  const keys = path.split('.');
  let current: unknown = testIds;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      throw new Error(`Test ID path "${path}" not found`);
    }
  }

  if (typeof current === 'string') {
    return current;
  }

  throw new Error(`Test ID path "${path}" does not resolve to a string`);
};

/**
 * Helper function to generate dynamic test IDs for list items
 *
 * @example
 * getDynamicTestId('globals', 'tableRow', 'myKey') // returns 'globals-table-row-myKey'
 */
export const getDynamicTestId = (
  module: string,
  element: string,
  identifier: string,
): string => {
  return `${module}-${element}-${identifier}`;
};

/**
 * Playwright-specific selectors
 * Use these in your Playwright tests for consistent element targeting
 */
export const selectors = {
  byTestId: (testId: string) => `[data-testid="${testId}"]`,
  byTestIdContains: (testId: string) => `[data-testid*="${testId}"]`,
  byTestIdStartsWith: (testId: string) => `[data-testid^="${testId}"]`,
  byTestIdEndsWith: (testId: string) => `[data-testid$="${testId}"]`,
} as const;

/**
 * Common Playwright test patterns
 */
export const testPatterns = {
  // Wait for element to be visible
  waitForVisible: (testId: string) => selectors.byTestId(testId),

  // Check if element exists
  elementExists: (testId: string) => selectors.byTestId(testId),

  // Get all elements with test ID pattern
  getAllByPattern: (pattern: string) => selectors.byTestIdContains(pattern),

  // Wait for toast to appear
  waitForToast: (toastType: 'success' | 'error', action: string) =>
    selectors.byTestId(`globals-toast-${action}-${toastType}`),
} as const;
