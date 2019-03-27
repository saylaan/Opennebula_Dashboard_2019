# SandboxALE-AAPP_2019
XML-RPC :
Very simple concept with a limited set of capabilities. (reduce the difficulty of implementing the protocol and testing its interoperability)
Can manage to build sophisticated and powerfull architectures
-http protocol
-small XML Vocabulary
-client = procedure name + param
-server = resp or fault
-list of type and content (struct + array = complex)
-no notion of obj
-quick and easy

*Overview :
1. data models (type for param, return value, fault(error msg))
2. request structures (HTTP POST with method and param)
3. response structures (HTTP resp with value or fault)

1.
<value>
  <array>
    <data>
      <value><string> example </string></value>
      <value><int> 1 </int></value>
      <value><double> 2.0 </double></value>
      <value><boolean>1</boolean></value>
    </data>
  </array>
</value>
An an array to make 2D
A Struct look like that :
<value>
  <struct>
    <member>
      <name>The name</name>
      <value><string>Joseph</string></value>
    </member>
    <member>
      ....
    </member>
  </struct>
</value>

2. XML + HTTP headers
<?xml version="1.0"?> // XML-RPC request
<methodCall>
  <methodName>exemple name</methodName>
    <params>
      <param>
        ....
      </param>
    </params>
</methodCall>
+ POST /target HTTP 1.0 (POST /xmlrpc HTTP 1.0)
User-Agent: Identifier (myXMLRPCClient/1.0)
Host: host.making.request (IP)
Content-Type: text/xml
Content-Length: length of request in bytes

3. Like the request
--> for the XML-RPC
-Only one Param(always)
-An array or a struct (xxx values)
-Success value = bool set to true
<methodResponse>
  <params>
    <param>
      <value><int></int></value> // only one value as a array or struct inside
    </param>
  <params>
</methodResponse>
-200 OK response code
-Content-type = text/xml
-Content-length = size in byte of the Content
-Requires HTTP 1.0 but 1.1 works
--> Example:
HTTP/1.x 200 OK
Date: ...
Server:
Connection: close
Content-Type:
Content-length:
After a response from the XML-RPC server, the connection is closed (always separate send request)

Fault Format resp:
-no param but <fault></fault> with one value again
<value>
  <struct>
    <member>
      <name>code</name>
      <value><int>26</int></value>
    </member>
    <member>
      <name>message</name>
      <value><string>No such method!</string></value>
    </member>
  </struct>
</value>

Example of basic Use :
