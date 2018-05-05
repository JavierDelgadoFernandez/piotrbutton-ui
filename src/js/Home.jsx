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

import BackendConnection from "./BackendConnection";
import Layout from "./Layout";
import React from "react";

export default class Home extends React.Component {
    componentDidMount() {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        this.backend = new BackendConnection();
        this.backend.addListener(e => new Notification(e.data));
    }

    render() {
        return <Layout>
            <div className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-3">PiotrButton</h1>
                    <p>Broadcasts an event to all of the connected clients.</p>
                    <p>
                        <a className="btn btn-primary btn-lg"
                            onClick={() => this.backend.ping()}>
                            Ping!
                        </a>
                    </p>
                </div>
            </div>
        </Layout>;
    }
}
