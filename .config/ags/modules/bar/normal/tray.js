import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
const { Box, Icon, Button, Revealer } = Widget;
const { Gravity } = imports.gi.Gdk;

const SysTrayItem = (item) => Button({
    className: 'bar-systray-item',
    child: Icon({
        hpack: 'center',
        icon: item.icon,
        setup: (self) => self.hook(item, (self) => self.icon = item.icon),
    }),
    setup: (self) => self
        .hook(item, (self) => self.tooltipMarkup = item['tooltip-markup'])
    ,
    onClicked: btn => item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    onSecondaryClick: btn => item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
});

export const Tray = (props = {}) => {
    const trayContent = Box({
        className: 'margin-right-5 spacing-h-15',
        setup: (self) => self
            .hook(SystemTray, (self) => {
                self.children = SystemTray.items.map(SysTrayItem);
                self.show_all();
            })
        ,
    });
    const trayRevealer = Widget.Revealer({
        revealChild: true,
        transition: 'slide_left',
        transitionDuration: userOptions.animations.durationLarge,
        child: trayContent,
    });
    return Box({
        ...props,
        children: [trayRevealer],
    });
}
