export function webNotification() {
	const requestDesktopNotificationPermission = function() {
		if (Notification && Notification.permission === 'default') {
			Notification.requestPermission(function(permission) {
				if (!('permission' in Notification)) {
					Notification.permission = permission;
				}
			});
		}
	};
	const asdf = function() {
		if ('Notification' in window) {
			console.log('Nice Bro.');
		}

		this.requestDesktopNotificationPermission();
	};
}
