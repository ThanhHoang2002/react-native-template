import { useCallback, useMemo } from "react";

import { useAuthStore } from "../stores/auth-store";

export function usePermissionCheck() {
  const resources = useAuthStore((state) => state.resources);

  const resourceSubjects = useMemo(
    () => new Set(resources.map((resource) => resource.subject)),
    [resources],
  );

  const hasAnyPermission = useCallback(
    () => resourceSubjects.size > 0,
    [resourceSubjects],
  );

  const hasNoPermissions = useCallback(
    () => resourceSubjects.size === 0,
    [resourceSubjects],
  );

  const hasPermission = useCallback(
    (resource: string) => resourceSubjects.has(resource),
    [resourceSubjects],
  );

  const hasAnyPermissions = useCallback(
    (resourcesToCheck: string[]) =>
      resourcesToCheck.some((resource) => resourceSubjects.has(resource)),
    [resourceSubjects],
  );

  const hasAllPermissions = useCallback(
    (resourcesToCheck: string[]) =>
      resourcesToCheck.every((resource) => resourceSubjects.has(resource)),
    [resourceSubjects],
  );

  return {
    hasAllPermissions,
    hasAnyPermission,
    hasAnyPermissions,
    hasNoPermissions,
    hasPermission,
  };
}
