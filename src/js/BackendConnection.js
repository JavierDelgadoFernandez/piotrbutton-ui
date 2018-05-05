/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default class BackendConnection {
    static getDefaultServer() {
        return `${window.location.protocol === "https:" ? "wss" : "ws"}://${
            window.location.hostname}:8080/`;
    }

    constructor(server) {
        this.server = server || BackendConnection.getDefaultServer();
        this.listeners = [];
        this.configureWS();
    }

    configureWS() {
        this.ws = new WebSocket(this.server);
        this.ws.onmessage = (e) => this.listeners.forEach(l => l(e));
    }

    ping() {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send("ping");
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }
}
