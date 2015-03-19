# Configuring Firefox to Use a PAC File
#
# 1. In Firefox, click on Tools > Options > Advanced > Network.
# 2. Click Settings > Select Automatic Proxy Configuration URL.
# 3. Type the path and filename of your PAC file. e.g. http://<url>/proxy.pac
# 4. Click Reload, and then click OK twice.

function FindProxyForURL(url, host) {
    host = host.toLowerCase();
    if (
        dnsDomainIs(host, "gnulug.org")
     || dnsDomainIs(host, "open-nsm.net")
     || dnsDomainIs(host, "jonschipp.com")
     || dnsDomainIs(host, "sickbits.net")
     || shExpMatch(host, "192.17.239.*")
    )
        return "SOCKS 127.0.0.1:55555"; // (IP:port)

    //if (dnsDomainIs(host, "test.com"))
    //    return "SOCKS 127.0.0.1:1234"; // (IP:port)

    return "DIRECT";
}
