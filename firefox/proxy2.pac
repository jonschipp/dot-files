function FindProxyForURL(url, host) {

    // Site 1
    var proxy = "SOCKS 127.0.0.1:28001";

    var subnets = [
  {
      "name": "subnet1",
      "start": "0.0.0.0",
      "netmask": "255.255.255.128"},
  {
      "name": "subnet2",
      "start": "0.0.0.0",
      "netmask": "255.255.255.0"}
    ];

    for (var i = 0; i < subnets.length; i++)
  {
  if ( isInNet(host, subnets[i].start, subnets[i].netmask) )
    return proxy;
  }

    // Site 2

    var cmu_proxy = "SOCKS 127.0.0.1:28000";

    if ( dnsDomainIs(host, ".local") )
  return cmu_proxy;

    if ( dnsDomainIs(host, ".org") )
  return cmu_proxy;

    // No match
    return "DIRECT";
}
