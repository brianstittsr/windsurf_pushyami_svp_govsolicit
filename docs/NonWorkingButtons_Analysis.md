# Buttons Without onClick Handlers Analysis

This document lists buttons in the codebase that may need onClick handlers or functionality implementation.

**Note:** Buttons with `asChild` prop are typically wrapping `<Link>` components and work correctly.
Buttons with `type="submit"` work via form submission.

---

## Analysis Method

Buttons are considered "non-functional" if they:
1. Don't have an `onClick` handler
2. Don't have `asChild` prop (which delegates to child element like Link)
3. Don't have `type="submit"` (form submission)
4. Are not disabled placeholder buttons

---

## Files to Review

Based on grep search, the following files have the most buttons and should be reviewed:

### High Priority (Many Buttons)
1. `app/(portal)/portal/eos2/page.tsx` - 43 buttons
2. `app/(portal)/portal/apollo-search/page.tsx` - 30 buttons
3. `app/(portal)/portal/svp-tools/[tool]/page.tsx` - 30 buttons
4. `app/(portal)/portal/linkedin-content/page.tsx` - 27 buttons
5. `app/(portal)/portal/availability/page.tsx` - 26 buttons
6. `app/(portal)/portal/gohighlevel/page.tsx` - 25 buttons
7. `app/(portal)/portal/proposals/page.tsx` - 25 buttons

### Medium Priority
8. `app/(portal)/portal/admin/team-members/page.tsx` - 20 buttons
9. `app/(portal)/portal/supplier-search/page.tsx` - 20 buttons
10. `app/(portal)/portal/admin/initiatives/tbmnc/page.tsx` - 18 buttons
11. `app/(portal)/portal/svp-tools/business-planning/page.tsx` - 18 buttons
12. `app/(portal)/portal/profile/page.tsx` - 17 buttons

---

## Known Non-Functional Buttons

### Portal Header (`components/portal/portal-header.tsx`)
- ✅ FIXED: Sign Out button - now has onClick handler

### Portal Sidebar (`components/portal/portal-sidebar.tsx`)
- ✅ FIXED: Sign Out button - now has onClick handler

### Command Center (`app/(portal)/portal/command-center/page.tsx`)
- Potential: Quick action buttons may need handlers

### Settings Page (`app/(portal)/portal/settings/page.tsx`)
- Various "Save" and "Test Connection" buttons - need review

### Solicitations Dashboard (`app/(portal)/portal/work/solicitations/dashboard/page.tsx`)
- Export, Filter, and action buttons - need review

---

## Recommendations

1. **Audit each page** for buttons that should trigger actions
2. **Add toast notifications** for buttons that are "coming soon"
3. **Implement actual functionality** where possible
4. **Disable buttons** that aren't ready with a tooltip explaining why

---

## Button Patterns That Are OK

```tsx
// OK - Uses asChild to delegate to Link
<Button asChild>
  <Link href="/somewhere">Go</Link>
</Button>

// OK - Form submission
<Button type="submit">Submit</Button>

// OK - Has onClick
<Button onClick={() => doSomething()}>Click</Button>

// OK - Disabled placeholder
<Button disabled>Coming Soon</Button>
```

## Button Patterns That Need Attention

```tsx
// NEEDS ATTENTION - No handler, not a link, not a form submit
<Button>Do Something</Button>

// NEEDS ATTENTION - Has variant but no action
<Button variant="outline">Export</Button>
```

---

*Generated: December 31, 2024*
*Run a full audit to identify specific buttons needing implementation*
